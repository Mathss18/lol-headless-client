import * as net from "net";
import * as tls from "tls";
import { v4 as uuidv4 } from "uuid";
import { Handshake } from "./handshake/handshake";
import { RtmoInfoBuilder } from "./rtmp-info.builder";
import { RtmpPacketReader } from "./rtmp-packet-reader";
import TypedObject from "./typed-object";
import { PublicTokens } from "../../client/VirtualClient";
import { UserData } from "../../suppliers/user-data.supplier";
import { AMFEncoder } from "./amf/amf-encoder";
import { Logger } from "../../utils/logger.util";
import { Champion, ChampionName } from "../../enums/champion.enum";
import { setTimeout as sleep } from "timers/promises";
import { user } from "../../args";

export class RtmpClient {
  private socket!: tls.TLSSocket;
  private rtmpConnected: boolean;
  private rtmpPacketReader: RtmpPacketReader;
  private baseRtmpInfo: RtmoInfoBuilder;
  public DSId: string | null;
  private token: string;
  private accountId: number;
  public pickState = {
    pickActionId: null,
    banActionId: null,
    isChampPicked: false,
    isChampBanned: false,
    pickedChampion: null,
    bannedChampion: null,
    isMyTurnToPick: false,
    isMyTurnToBan: false,
    gameStarted: false,
  };

  private invokeID = 2;
  private messageCounter = 0;
  private heartbeatCounter = 0;
  private amfEncoder = new AMFEncoder();

  constructor(private host: string, private port: number, private tokens: PublicTokens, private userData: UserData) {
    this.rtmpConnected = false;
    this.baseRtmpInfo = new RtmoInfoBuilder();
    this.baseRtmpInfo
      .setFlashVersion("WIN 11,7,700,169")
      .setFPAD(false)
      .setCapabilities(239)
      .setAudioCodecs(3191)
      .setVideoCodecs(242)
      .setVideoFunction(1)
      .setObjectEncoding(3);
    this.rtmpPacketReader = new RtmpPacketReader(this);
    this.DSId = null;
  }

  public async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const socket = net.connect(this.port, this.host, () => {
        this.socket = tls.connect({
          socket,
          rejectUnauthorized: false,
        });

        this.socket
          .on("secureConnect", () => {
            Logger.magenta("[RTMP] TLS connected \n");
            this.rtmpConnected = true;
            resolve();
          })
          .on("error", (error) => {
            console.error("Error:", error);
            reject(error);
          });
      });

      socket.on("error", (error) => {
        console.error("Error:", error);
        reject(error);
      });
    });
  }

  public async handshake() {
    return new Promise<void>((resolve, reject) => {
      const handshake = new Handshake();
      handshake.initialize(this.socket);
      handshake.once("done", () => {
        Logger.magenta("[RTMP] Handshake done \n");
        this.socket.removeAllListeners();
        resolve();
      });
      handshake.once("error", (error) => {
        this.socket.removeAllListeners();
        reject(error);
      });
    });
  }

  public async startListening(): Promise<void> {
    this.socket.on("data", (data: Buffer) => {
      try {
        this.rtmpPacketReader.handleReceivedData(data);
      } catch (error) {
        console.error("Error handling received data:", error);
      }
    });

    this.socket.on("error", (error: Error) => {
      console.error("Socket error:", error);
    });

    this.socket.on("close", () => {
      Logger.red("Socket closed");
    });
  }

  public async connectToRiot(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const rtmpConnectInfo = this.baseRtmpInfo
        .replicate()
        .setApp("")
        .setSwfURL("app:/LolClient.swf/[[DYNAMIC]]/50")
        .setTcURL(`rtmps://${this.host}:${this.port}`)
        .setPageURL("")
        .build();
      try {
        await this.write(this.amfEncoder.encodeConnect(rtmpConnectInfo.getMap()));
        setTimeout(() => {
          resolve();
        }, 2000);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async login(): Promise<void> {
    return new Promise(async (resolve, _) => {
      this.rtmpPacketReader.setTag("login");
      const typedObject = new TypedObject("com.riotgames.platform.login.AuthenticationCredentials");
      typedObject.set("macAddress", "000000000000");
      typedObject.set("authToken", "");
      typedObject.set("userInfoTokenJwe", this.tokens.userInfoToken);
      typedObject.set("leagueSessionToken", this.tokens.sessionToken);
      typedObject.set("sessionIpToken", this.tokens.siptToken);
      typedObject.set("partnerCredentials", this.tokens.lolToken);
      typedObject.set("domain", "lolclient.lol.riotgames.com");
      typedObject.set("clientVersion", "LCU");
      typedObject.set("locale", "en_GB");
      typedObject.set("username", user);
      typedObject.set(
        "operatingSystem",
        '{"edition":"Professional, x64","platform":"Windows","versionMajor":"10","versionMinor":""}'
      );
      typedObject.set("securityAnswer", null);
      typedObject.set("oldPassword", null);
      typedObject.set("password", null);

      await this.invoke(this.wrap("loginService", "login", typedObject));
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  public async login2(): Promise<void> {
    const interval = 120000; // 2 min in milies
    return new Promise(async (resolve, _) => {
      const body = this.rtmpPacketReader.getPacketByTag("login").getTypedObject("data").getTypedObject("body");

      this.token = body.getString("token");
      this.accountId = body.getTypedObject("accountSummary").getLong("accountId");

      const channels: string[] = ["gn", "cn", "bc"];

      for (let i = 1; i >= 0; i--) {
        for (const channel of channels) {
          this.subscribe(`${channel}-${this.accountId}`, i);
        }
      }

      await sleep(500);

      const buffer: Buffer = Buffer.from(`${user.toLowerCase()}:${this.token}`, "utf-8");
      const base64Encoded: string = buffer.toString("base64");
      const auth: TypedObject = this.wrap("auth", 8, base64Encoded);
      auth.setType("flex.messaging.messages.CommandMessage");
      this.invoke(auth);

      await sleep(500);

      this.heartbeat();
      setInterval(() => {
        this.heartbeat();
      }, interval);

      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  private async subscribe(client: string, operation: number): Promise<void> {
    const body: TypedObject = this.wrap("messagingDestination", operation, [new TypedObject()]);
    body.setType("flex.messaging.messages.CommandMessage");

    const headers: TypedObject = new TypedObject();
    headers.set("DSEndpoint", "my-rtmp");
    headers.set("DSSubtopic", !client.startsWith("b") ? client : client.split("-")[0]);
    headers.set("DSRequestTimeout", 60);
    headers.set("DSId", this.DSId);

    body.set("headers", headers);
    body.set("clientId", client);

    await this.invoke(body);
  }

  private heartbeat(): void {
    const now = new Date();
    const formatedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}:${String(now.getSeconds()).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`;
    const data: Object[] = [this.accountId, this.token, ++this.heartbeatCounter, formatedDate];
    Logger.magenta(`[RTMP] Heartbeat - ${++this.heartbeatCounter} count`);

    try {
      this.invoke(this.wrap("loginService", "performLCDSHeartBeat", data));
    } catch (e) {
      console.error("[rtmp-out] failed to send heartbeat");
    }
  }

  async banChampionsLoop(champion: Champion): Promise<boolean> {
    while (!this.pickState.isChampBanned) {
      await this.banChampion(champion);
      await sleep(2000);
    }
    return true;
  }

  public async banChampion(championId: Champion): Promise<void> {
    if (this.pickState.isChampBanned || !this.pickState.isMyTurnToBan) return;
    Logger.red(`Trying to ban champion ${ChampionName[championId]}`);
    await this.championAction(championId, this.pickState.banActionId);
  }

  async selectChampionsLoop(champions: Champion[]): Promise<boolean> {
    while (!this.pickState.isChampPicked) {
      await this.selectChampion(champions);
      await sleep(2000);
    }
    return true;
  }

  public async selectChampion(championIds: Champion[]): Promise<void> {
    if (this.pickState.isChampPicked || !this.pickState.isMyTurnToPick) return;
    const selectedChampion = championIds[Math.floor(Math.random() * championIds.length)];
    Logger.magenta(`Trying to select champion ${ChampionName[selectedChampion]}`);
    await this.championAction(selectedChampion, this.pickState.pickActionId);
  }

  private async championAction(selectedChampion: Champion, actionId: number): Promise<void> {
    console.log({
      actionId: actionId,
      championId: selectedChampion,
      completed: true,
    });
    await this.invoke(
      this.wrap("lcdsServiceProxy", "call", [
        uuidv4(),
        "teambuilder-draft",
        "updateActionV1",
        JSON.stringify({
          actionId: actionId,
          championId: selectedChampion,
          completed: true,
        }),
      ])
    );
  }

  public async selectChampionCustom(): Promise<void> {
    Logger.magenta(`Trying to select champion`);
    await this.invoke(this.wrap("gameService", "selectChampionV2", [22, 22022]));
  }

  private async reportPlayer(gameId: number, offenderSummonerId: number): Promise<void> {
    Logger.magenta(`Trying to report player`);
    await this.invoke(
      this.wrap("lcdsServiceProxy", "call", [
        uuidv4(),
        "report",
        "reportPlayer",
        JSON.stringify({
          comments: "",
          gameId,
          offenderSummonerId,
          offenses: "NEGATIVE_ATTITUDE,VERBAL_ABUSE,ASSISTING_ENEMY_TEAM",
        }),
      ])
    );
  }

  public async read(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.socket.once("readable", () => {
        const byte = this.socket.read(1);
        if (byte) {
          resolve(byte.readUInt8(0));
        } else {
          reject(new Error("Failed to read byte from the socket."));
        }
      });

      this.socket.once("error", (error) => {
        reject(error);
      });
    });
  }

  public async write(buffer: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.write(buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private async invoke(typedObject: TypedObject) {
    const id = this.nextInvokeID();
    await this.submit(id, typedObject);
    return id;
  }

  private async submit(id: number, typedObject: TypedObject) {
    const data = this.amfEncoder.encodeInvoke(id, typedObject);
    await this.write(data);
  }

  private wrap(destination: string, operation: string | number, body: any): TypedObject {
    const headers = new TypedObject();
    headers.set("DSRequestTimeout", 60);
    headers.set("DSId", this.DSId);
    headers.set("DSEndpoint", "my-rtmp");

    const typedObject = new TypedObject("flex.messaging.messages.RemotingMessage");
    typedObject.set("destination", destination);
    typedObject.set("operation", operation);
    typedObject.set("source", null);
    typedObject.set("timestamp", 0);
    typedObject.set("messageId", `${this.userData.accountId}-${this.messageCounter++}`);
    typedObject.set("timeToLive", 0);
    typedObject.set("clientId", null);
    typedObject.set("headers", headers);
    typedObject.set("body", body);
    return typedObject;
  }

  public async close() {
    this.socket.destroy();
  }

  private nextInvokeID(): number {
    return this.invokeID++;
  }
}

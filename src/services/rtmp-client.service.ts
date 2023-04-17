import * as net from "net";
import * as tls from "tls";
import { v4 as uuidv4 } from "uuid";
import { Handshake } from "./handshake";
import { RtmoInfoBuilder } from "./rtmp-info.builder";
import { AMFEncoder } from "./amf-encoder";
import { RtmpPacketReader } from "./rtmp-packet-reader";
import TypedObject from "./typed-object";
import { PublicTokens } from "../client/VirtualClient";
import { UserData } from "../suppliers/user-data.supplier";

export class RtmpClient {
  private socket!: tls.TLSSocket;
  private rtmpConnected: boolean;
  private rtmpPacketReader: RtmpPacketReader;
  private baseRtmpInfo: RtmoInfoBuilder;
  public DSId: string | null;
  private invokeID = 2;
  private messageCounter = 0;
  private amfEncoder = new AMFEncoder();

  constructor(
    private host: string,
    private port: number,
    private tokens: PublicTokens,
    private userData: UserData
  ) {
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
            console.log("TLS connected");
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

  public async authorize() {
    return new Promise<void>((resolve, reject) => {
      const handshake = new Handshake();
      handshake.initialize(this.socket);
      handshake.once("done", () => {
        console.log("Handshake done");
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
      console.log("Socket closed");
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
        await this.write(
          this.amfEncoder.encodeConnect(rtmpConnectInfo.getMap())
        );
        setTimeout(() => {
          resolve();
        }, 5000);
        // resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public async login() {
    const typedObject = new TypedObject(
      "com.riotgames.platform.login.AuthenticationCredentials"
    );
    typedObject.set("macAddress", "000000000000");
    typedObject.set("authToken", "");
    typedObject.set("userInfoTokenJwe", this.tokens.userInfoToken);
    typedObject.set("leagueSessionToken", this.tokens.sessionToken);
    typedObject.set("sessionIpToken", this.tokens.siptToken);
    typedObject.set("partnerCredentials", this.tokens.lolToken);
    typedObject.set("domain", "lolclient.lol.riotgames.com");
    typedObject.set("clientVersion", "LCU");
    typedObject.set("locale", "en_GB");
    typedObject.set("username", process.env.USERNAME);
    typedObject.set(
      "operatingSystem",
      '{"edition":"Professional, x64","platform":"Windows","versionMajor":"10","versionMinor":""}'
    );
    typedObject.set("securityAnswer", null);
    typedObject.set("oldPassword", null);
    typedObject.set("password", null);

    const id = await this.invoke(
      this.wrap("loginService", "login", typedObject)
    );
  }

  public async selectChampion() {
    const typedObject = new TypedObject(
      "com.riotgames.platform.login.AuthenticationCredentials"
    );
    const id = await this.invoke(
      this.wrap("lcdsServiceProxy", "call", [
        uuidv4(),
        "teambuilder-draft",
        "updateActionV1",
        "{\"actionId\":1,\"championId\":22,\"completed\":true}",
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

  private wrap(destination: string, operation: string, body: any): TypedObject {
    const headers = new TypedObject();
    headers.set("DSRequestTimeout", 60);
    headers.set("DSId", this.DSId);
    headers.set("DSEndpoint", "my-rtmp");

    const typedObject = new TypedObject(
      "flex.messaging.messages.RemotingMessage"
    );
    typedObject.set("destination", destination);
    typedObject.set("operation", operation);
    typedObject.set("source", null);
    typedObject.set("timestamp", 0);
    typedObject.set(
      "messageId",
      `${this.userData.accountId}-${this.messageCounter++}`
    );
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

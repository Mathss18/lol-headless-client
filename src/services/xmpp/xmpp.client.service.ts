import * as tls from "tls";
import { Logger } from "../../utils/logger.util";
import { setTimeout as sleep } from "timers/promises";
import { parseString } from "xml2js";
import {
  BASE_PLAYER_INFO,
  generateRandomDigitsForChat,
  getFormattedDate,
  removeRcPart,
} from "./xmpp.utils";
import { Region } from "../../enums/region.enum";
import { getRegion } from "../../config/regions";
import { CallbackEvent } from "../../main";
import { EventCallbackName } from "../../enums/event-callback-name.enum";

export type PlayerStatus = "online" | "offline" | "away";

export type PlayerInfo = {
  bannerIdSelected?: string;
  challengeCrystalLevel?: string;
  challengePoints?: string;
  challengeTokensSelected?: string;
  championId: string;
  companionId?: string;
  damageSkinId?: string;
  gameMode?: string;
  gameQueueType: string;
  gameStatus: string;
  iconOverride?: string;
  isObservable?: string;
  legendaryMasteryScore: string;
  level: string;
  mapId: string;
  mapSkinId?: string;
  masteryScore?: string;
  playerTitleSelected?: string;
  profileIcon: string;
  pty?:
    | {
        maxPlayers: number;
        partyId: string;
        queueId: number;
        summoners: number[];
      }
    | string;
  puuid?: string;
  queueId?: string;
  rankedPrevSeasonDivision?: string;
  rankedPrevSeasonTier?: string;
  regalia: {
    bannerType: number;
    crestType: number;
    selectedPrestigeCrest: number;
  };
  skinVariant: string;
  skinname: string;
};
export type Message = {
  id: string;
  type: string;
  sender: string;
  receiver: string;
  timestamp: string;
  content: string;
};
export type Friend = {
  jid: string;
  puuid: string;
  name: string;
  state: PlayerStatus;
  lastOnline: string;
  internalName: string;
  tagline: string;
};
export type ChatStatus = "chat" | "away";

export class XmppClient {
  private socket: tls.TLSSocket;
  private heartBeat: NodeJS.Timeout;
  private heartbeatCounter = 0;
  private host = "";
  private port = 5223;
  private xmppRegion = "";
  private xmppRegionUpper = "";
  private lastChatHistoryFriendJid = "";
  private authMessages: string[] = [];
  private joinOpenPartyInfo = {
    active: false,
    friendPuuid: "",
    resolvePromise: null as ((partyId: string) => void) | null,
  };
  private joinOpenPartyPartyId = "";
  private _callback: (data: CallbackEvent) => void;

  constructor(
    private rsoToken: string,
    private pasToken: string,
    private entitlementsToken: string,
    private region: Region
  ) {
    const { xmppUrl, regionLower2, regionUpper } = getRegion(this.region);
    this.host = xmppUrl;
    this.xmppRegion = regionLower2;
    this.xmppRegionUpper = regionUpper;
    this.authMessages = [
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<auth mechanism="X-Riot-RSO-PAS" xmlns="urn:ietf:params:xml:ns:xmpp-sasl"><rso_token>${this.rsoToken}</rso_token><pas_token>${this.pasToken}</pas_token></auth>`,
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<iq id="_xmpp_bind1" type="set"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><puuid-mode enabled="true"/><resource>RC-4012164551</resource></bind></iq>`,
      `<iq type="set" id="xmpp_entitlements_0"><entitlements xmlns="urn:riotgames:entitlements"><token>${this.entitlementsToken}</token></entitlements></iq><iq id="_xmpp_session1" type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"><platform>riot</platform></session></iq>`,
      `<iq type="get" id="1"><query xmlns="jabber:iq:riotgames:roster" last_state="true"/></iq><iq type="get" id="privacy_update_2"><query xmlns="jabber:iq:privacy"><list name="LOL"/></query></iq><iq type="get" id="recent_convos_3"><query xmlns="jabber:iq:riotgames:archive:list"/></iq><iq id='update_session_active_4' type='set'><query xmlns='jabber:iq:riotgames:session'><session mode='active'/></query></iq><presence id='presence_5'><show>chat</show><status></status><games><keystone><st>chat</st><s.t>1715443396510</s.t><m></m><s.p>keystone</s.p><pty/></keystone></games></presence>`,
      `<presence/>`,
    ];
  }

  public listen(callback: (data: CallbackEvent) => void) {
    this._callback = callback;
  }

  public connect() {
    return new Promise<void>((resolve, reject) => {
      this.socket = tls.connect(this.port, this.host);

      this.socket
        .on("secureConnect", async () => {
          Logger.yellow("[XMPP] Connected. \n");
          this.callCallback(EventCallbackName.XMPP_CONNECTED);
          this.read();
          await sleep(500);
          await this.sendAuthMessages();
          await sleep(2000);
          await this.getFriendList();
          await sleep(1000);
          this.heartBeat = setInterval(() => {
            this.heartbeat();
          }, 29000);
          resolve();
        })
        .on("error", (error) => {
          console.error("Error:", error);
          reject(error);
        })
        .on("end", () => {
          clearInterval(this.heartBeat);
          Logger.yellow("[XMPP] Server ended the connection");
          this.callCallback(EventCallbackName.XMPP_DISCONNECTED);
        });
    });
  }

  public async disconnect() {
    if (this.socket) {
      this.socket.end();
      Logger.yellow("[XMPP] Disconnected.");
      this.callCallback(EventCallbackName.XMPP_DISCONNECTED);
    }
  }

  public async addFriend(username: string, tagline: string) {
    if (tagline.startsWith("#")) tagline = tagline.substring(1);
    await this.write(
      `<iq id="roster_add_1" type="set"><query xmlns="jabber:iq:riotgames:roster"><item subscription="pending_out"><id name="${username}" tagline="${tagline.toLowerCase()}"></id></item></query></iq>`
    );
  }

  public async setInfo({
    status,
    statusMessage = "",
    playerInfo = BASE_PLAYER_INFO,
  }: {
    status: ChatStatus;
    statusMessage?: string;
    playerInfo?: PlayerInfo;
  }) {
    const info = JSON.stringify(playerInfo);
    const now = Date.now();
    await this.write(
      `<presence id='presence_1'><show>chat</show><status>${statusMessage}</status><games><keystone><st>chat</st><s.t>${now}</s.t><m></m><s.p>keystone</s.p><pty/></keystone><league_of_legends><s.r>${this.xmppRegionUpper}</s.r><st>${status}</st><s.t>${now}</s.t><m></m><p>${info}</p><s.p>league_of_legends</s.p><s.c>live</s.c><pty/></league_of_legends></games></presence>`
    );
  }

  public async sendMessage(message: string, jid: string) {
    const id = generateRandomDigitsForChat(13);
    await this.write(
      `<message id="${id}:1" to="${jid}" type="chat"><body>${message}</body></message>`
    );
  }

  public async markChatHistoryAsRead(jid: string) {
    jid = removeRcPart(jid);
    const id = generateRandomDigitsForChat(2);
    await this.write(
      `<iq type="set" id="set_archive_read_${id}"><query xmlns="jabber:iq:riotgames:archive:read"><acknowledge with="${jid}" read="${getFormattedDate()}" /></query></iq>`
    );
  }

  public async getChatHistory(jid: string, markChatHistoryAsRead = true) {
    if (markChatHistoryAsRead) {
      this.markChatHistoryAsRead(jid);
    }
    this.lastChatHistoryFriendJid = removeRcPart(jid);
    const id = generateRandomDigitsForChat(2);
    await this.write(
      `<iq type="get" id="get_archive_${id}"><query xmlns="jabber:iq:riotgames:archive"><with>${this.lastChatHistoryFriendJid}</with></query></iq>`
    );
  }

  public async getFriendList() {
    await this.write(
      `<iq type="get" id="2"><query xmlns="jabber:iq:riotgames:roster" last_state="true" /></iq>`
    );
  }

  private async sendAuthMessages(): Promise<void> {
    return new Promise(async (resolve) => {
      for (const message of this.authMessages) {
        await this.write(message);
        await sleep(500);
      }
      await sleep(2000);
      resolve();
    });
  }

  private read(): void {
    let bufferedMessage = "";

    this.socket.on("data", async (data) => {
      data = data.toString();
      bufferedMessage += data;
      if (process.env?.LOL_HEADLESS_CLIENT_XMPP_LOGS === "true") {
        Logger.yellow("[RECEIVE XMPP <-] ");
        Logger.default(data + "\n");
      }

      while (true) {
        let completeMessage = null;
        const messageTypes = [
          "</stream:stream>",
          "</stream:features>",
          "</iq>",
          "</success>",
          "</presence>",
          "</message>",
        ];

        for (const messageType of messageTypes) {
          if (bufferedMessage.includes(messageType)) {
            const endIndex =
              bufferedMessage.indexOf(messageType) + messageType.length;
            completeMessage = bufferedMessage.slice(0, endIndex);
            bufferedMessage = bufferedMessage.slice(endIndex);
            break;
          }
        }

        // No complete message found, exit the loop
        if (!completeMessage) {
          break;
        }

        try {
          // Process the complete XML message
          await this.parseStringPromise(completeMessage);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  private heartbeat(): void {
    this.write(" ");
    Logger.yellow(`[XMPP] Heartbeat - ${++this.heartbeatCounter} count \n`);
    this.callCallback(EventCallbackName.XMPP_HEARTBEAT, this.heartbeatCounter);
  }

  private async write(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === "open")
        this.socket.write(data, "utf8", (err) => {
          if (err) {
            reject(err);
          } else {
            if (process.env?.LOL_HEADLESS_CLIENT_XMPP_LOGS === "true") {
              Logger.yellow("[SENT XMPP ->] ");
              Logger.default(data + "\n");
            }
            this.callCallback(EventCallbackName.XMPP_SENT_RAW, data);
            resolve();
          }
        });
    });
  }

  private callCallback(eventName: EventCallbackName, data?: any) {
    if (this._callback) this._callback({ eventName, data });
  }

  private async parseStringPromise(xml: string): Promise<void> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          try {
            this.handleParsedXml(result);
            this.callCallback(EventCallbackName.XMPP_RECEIVED_RAW, xml);
          } catch (error) {
            console.log("error parsing xml", error);
          }
          resolve();
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleParsedXml(jsonObj: any): void {
    if (jsonObj.hasOwnProperty("iq")) {
      const xmlns = jsonObj?.iq?.query?.[0]?.$?.xmlns ?? null;
      if (xmlns === "jabber:iq:privacy") {
        // console.log(jsonObj.iq?.query[0]?.list);
      }
      if (jsonObj?.iq?.$?.id.startsWith("_xmpp_bind")) {
        this.handleMyJid(jsonObj.iq);
      }
      if (xmlns === "jabber:iq:riotgames:roster") {
        this.handleFriendList(jsonObj.iq?.query[0]?.item ?? []);
      }
      if (jsonObj.iq?.$?.id?.startsWith("get_archive")) {
        this.handleChatHistory(jsonObj.iq);
      }
    }
    if (jsonObj.hasOwnProperty("message")) {
      this.handleMessageReceived(jsonObj.message);
    }
    if (jsonObj.hasOwnProperty("presence")) {
      this.handlePresense(jsonObj.presence);
    }
  }

  private handleFriendList(players) {
    const friendList: Friend[] = [];
    const pendingFriends: Friend[] = [];

    for (const player of players) {
      const { jid, puuid, name, subscription } = player?.$;
      const state =
        Array.isArray(player?.state) && player.state.length > 0
          ? player.state[0]
          : "";
      const lastOnline =
        Array.isArray(player?.last_online) && player.last_online.length > 0
          ? player.last_online[0]
          : "";
      const internalName = player?.id?.[0]?.$?.name ?? "";
      const tagline = player?.id?.[0]?.$?.tagline ?? "";
      const friend = {
        jid,
        puuid,
        name,
        state,
        lastOnline,
        internalName,
        tagline,
      };
      if (subscription === "both") {
        friendList.push(friend);
      }
      if (subscription === "pending_out") {
        pendingFriends.push(friend);
      }
    }

    this.callCallback(EventCallbackName.XMPP_FRIENDLIST_UPDATED, friendList);
    this.callCallback(
      EventCallbackName.XMPP_PENDING_FRIENDS_UPDATED,
      pendingFriends
    );
  }

  public async joinOpenParty(friendPuuid: string) {
    this.joinOpenPartyInfo.active = true;
    this.joinOpenPartyInfo.friendPuuid = friendPuuid;
    return new Promise<string>((resolve) => {
      this.joinOpenPartyInfo.resolvePromise = resolve;
    });
  }

  private handlePresense(presence) {
    try {
      const from = presence?.$?.from;
      const chatShow = presence?.show?.[0];
      const chatStatus = presence?.status?.[0];
      const profileInfo = presence?.games?.[0]?.league_of_legends?.[0]?.p?.[0];
      Logger.default({ from });
      Logger.default({ chatShow });
      Logger.default({ chatStatus });
      if (
        this.joinOpenPartyInfo.active &&
        from.split("@")[0] === this.joinOpenPartyInfo.friendPuuid
      ) {
        const parsedObject = JSON.parse(profileInfo);
        const ptyString = parsedObject.pty;
        const ptyObject = JSON.parse(ptyString);
        const partyId = ptyObject.partyId;
        console.log({ friend: from.split("@")[0] });
        console.log({ partyId });
        if (this.joinOpenPartyInfo.resolvePromise) {
          console.log("Joining...");
          this.joinOpenPartyInfo.resolvePromise(partyId);
          this.joinOpenPartyInfo.resolvePromise = null; // clear the resolve function
          this.joinOpenPartyInfo.active = false; // reset the active flag
        }
      }
    } catch (error) {}
  }

  private handleChatHistory(conversation) {
    const chatHistory: Message[] = [];
    const myJid = removeRcPart(conversation.$.from);
    const theirJid = removeRcPart(this.lastChatHistoryFriendJid);
    this.callCallback(EventCallbackName.XMPP_MY_JID_UPDATE, myJid);
    if (!conversation?.message?.length) {
      this.callCallback(EventCallbackName.XMPP_CHAT_HISTORY_UPDATED, {
        chatHistory,
        friendJid: theirJid,
      });
      return;
    }

    const messages = conversation.message;
    messages?.map((message) => {
      const content = message.body[0];
      const sender = message.$.from;
      const receiver = message.$.to;
      const timestamp = message.$.stamp;
      const id = message.$.id;
      const type = message.$.type;
      chatHistory.push({ id, content, receiver, sender, timestamp, type });
    });

    this.callCallback(EventCallbackName.XMPP_CHAT_HISTORY_UPDATED, {
      chatHistory,
      friendJid: theirJid,
    });

    this.callCallback(
      EventCallbackName.XMPP_CHAT_LAST_READ_UPDATED,
      conversation?.reader?.$?.read
    );
  }

  private handleMessageReceived(data) {
    const { id, from, to, stamp, type } = data.$;
    const content = data.body[0];
    const message = {
      id,
      sender: removeRcPart(from),
      receiver: removeRcPart(to),
      timestamp: stamp,
      type,
      content: content,
    };

    Logger.default(message);
    this.callCallback(EventCallbackName.XMPP_CHAT_RECEIVED, message);
  }

  private handleMyJid(data) {
    const myJid = removeRcPart(data?.bind?.[0]?.jid?.[0]);
    this.callCallback(EventCallbackName.XMPP_MY_JID_UPDATE, myJid);
  }
}

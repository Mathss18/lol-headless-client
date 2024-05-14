import * as tls from "tls";
import { Logger } from "../../utils/logger.util";
import { setTimeout as sleep } from "timers/promises";
import { parseString } from "xml2js";
import { generateRandomDigitsForChat } from "./xmpp.utils";
import { Region } from "../../enums/region.enum";
import { getRegion } from "../../config/regions";

export type PlayerStatus = "online" | "offline" | "away";
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
  public friendList: Friend[] = [];
  private socket: tls.TLSSocket;
  private heartBeat: NodeJS.Timeout;
  private heartbeatCounter = 0;
  private host = "";
  private port = 5223;
  private xmppRegion = "";
  private authMessages: string[] = [];

  constructor(
    private rsoToken: string,
    private pasToken: string,
    private entitlementsToken: string,
    private region: Region
  ) {
    const { xmppUrl, regionLower } = getRegion(this.region);
    this.host = xmppUrl;
    this.xmppRegion = regionLower;
    this.authMessages = [
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<auth mechanism="X-Riot-RSO-PAS" xmlns="urn:ietf:params:xml:ns:xmpp-sasl"><rso_token>${this.rsoToken}</rso_token><pas_token>${this.pasToken}</pas_token></auth>`,
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<iq id="_xmpp_bind1" type="set"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><puuid-mode enabled="true"/><resource>RC-3138377982</resource></bind></iq>`,
      `<iq type="set" id="xmpp_entitlements_0"><entitlements xmlns="urn:riotgames:entitlements"><token>${this.entitlementsToken}</token></entitlements></iq><iq id="_xmpp_session1" type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"><platform>riot</platform></session></iq>`,
      `<iq type="get" id="1"><query xmlns="jabber:iq:riotgames:roster" last_state="true"/></iq><iq type="get" id="privacy_update_2"><query xmlns="jabber:iq:privacy"><list name="LOL"/></query></iq><iq type="get" id="recent_convos_3"><query xmlns="jabber:iq:riotgames:archive:list"/></iq><iq id='update_session_active_4' type='set'><query xmlns='jabber:iq:riotgames:session'><session mode='active'/></query></iq><presence id='presence_5'><show>chat</show><status></status><games><keystone><st>chat</st><s.t>1715443396510</s.t><m></m><s.p>keystone</s.p><pty/></keystone></games></presence>`,
    ];
  }

  public connect() {
    return new Promise<void>((resolve, reject) => {
      this.socket = tls.connect(this.port, this.host);

      this.socket
        .on("secureConnect", async () => {
          Logger.yellow("[XMPP] Connected. \n");
          this.read();
          await sleep(500);
          await this.sendAuthMessages();
          await sleep(2000);
          await this.fetchFriendList();
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
        });
    });
  }

  public async disconnect() {
    if (this.socket) {
      this.socket.end();
      Logger.yellow("[XMPP] Disconnected.");
    }
  }

  public async addFriend(username: string, tagline: string) {
    if (tagline.startsWith("#")) tagline = tagline.substring(1);
    await this.write(
      `<iq id="roster_add_1" type="set"><query xmlns="jabber:iq:riotgames:roster"><item subscription="pending_out"><id name="${username}" tagline="${tagline.toLowerCase()}"></id></item></query></iq>`
    );
  }

  public async setStatus(status: ChatStatus) {
    const now = Date.now();
    await this.write(
      `<presence id='presence_1'><show>chat</show><status></status><games><keystone><st>chat</st><s.t>${now}</s.t><m></m><s.p>keystone</s.p><pty/></keystone><league_of_legends><s.r>BR1</s.r><st>${status}</st><s.t>${now}</s.t><m></m><p>{&quot;championId&quot;:&quot;&quot;,&quot;companionId&quot;:&quot;1&quot;,&quot;damageSkinId&quot;:&quot;1&quot;,&quot;gameQueueType&quot;:&quot;&quot;,&quot;gameStatus&quot;:&quot;outOfGame&quot;,&quot;iconOverride&quot;:&quot;&quot;,&quot;legendaryMasteryScore&quot;:&quot;0&quot;,&quot;level&quot;:&quot;30&quot;,&quot;mapId&quot;:&quot;&quot;,&quot;mapSkinId&quot;:&quot;1&quot;,&quot;masteryScore&quot;:&quot;2&quot;,&quot;profileIcon&quot;:&quot;907&quot;,&quot;puuid&quot;:&quot;49f9f9af-1f50-5427-a386-915b9914e8e2&quot;,&quot;rankedPrevSeasonDivision&quot;:&quot;NA&quot;,&quot;rankedPrevSeasonTier&quot;:&quot;&quot;,&quot;regalia&quot;:&quot;{\&quot;bannerType\&quot;:2,\&quot;crestType\&quot;:1,\&quot;selectedPrestigeCrest\&quot;:0}&quot;,&quot;skinVariant&quot;:&quot;&quot;,&quot;skinname&quot;:&quot;&quot;}</p><s.p>league_of_legends</s.p><s.c>live</s.c><pty/></league_of_legends></games></presence>`
    );
  }

  public async sendMessage(message: string, jid: string) {
    const id = generateRandomDigitsForChat(13);
    await this.write(`<message id="${id}:1" to="${jid}" type="chat"><body>${message}</body></message>`);
  }

  public getFriendList() {
    return this.friendList;
  }

  private async fetchFriendList() {
    await this.write(`<iq type="get" id="2"><query xmlns="jabber:iq:riotgames:roster" last_state="true" /></iq>`);
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
    this.socket.on("data", async (data) => {
      let bufferedMessage = "";
      try {
        data = data.toString();
        Logger.yellow("[RECEIVE XMPP <-] ");
        console.dirxml(data);
        console.log("\n");

        // handle riot splitting messages into multiple parts
        if (data.startsWith("<?xml")) return;
        let oldBufferedMessage = null;
        while (oldBufferedMessage !== bufferedMessage) {
          oldBufferedMessage = bufferedMessage;
          data = bufferedMessage + data;
          if (data === "") return;
          if (!data.startsWith("<")) return console.log("RIOT: xml presence data doesn't start with '<'! " + data);

          const firstTagName = data.substring(1, data.indexOf(">")).split(" ", 1)[0];

          // check for self closing tag eg <presence />
          if (data.search(/<[^<>]+\/>/) === 0) data = data.replace("/>", `></${firstTagName}>`);

          let closingTagIndex = data.indexOf(`</${firstTagName}>`);
          if (closingTagIndex === -1) {
            // message is split, we need to wait for the end
            bufferedMessage = data;
            break;
          }

          // check for tag inside itself eg <a><a></a></a>
          // this happens when you send a message to someone
          let containedTags = 0;
          let nextTagIndex = data.indexOf(`<${firstTagName}`, 1);
          while (nextTagIndex !== -1 && nextTagIndex < closingTagIndex) {
            containedTags++;
            nextTagIndex = data.indexOf(`<${firstTagName}`, nextTagIndex + 1);
          }

          while (containedTags > 0) {
            closingTagIndex = data.indexOf(`</${firstTagName}>`, closingTagIndex + 1);
            containedTags--;
          }

          const firstTagEnd = closingTagIndex + `</${firstTagName}>`.length;
          bufferedMessage = data.substr(firstTagEnd); // will be empty string if only one tag
          data = data.substr(0, firstTagEnd);

          await this.parseStringPromise(data);

          data = "";
        }
      } catch (e) {
        console.log(e);
      }
    });

    this.socket.once("error", (error) => {
      console.log(error);
    });
  }

  private heartbeat(): void {
    Logger.yellow(`[XMPP] Heartbeat - ${++this.heartbeatCounter} count`);
    this.write(" ");
  }

  private async write(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === "open")
        this.socket.write(data, "utf8", (err) => {
          if (err) {
            reject(err);
          } else {
            Logger.yellow("[SEND XMPP ->] ");
            console.dirxml(data);
            console.log("\n");
            resolve();
          }
        });
    });
  }

  private async parseStringPromise(xml: string): Promise<void> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) reject(err);
        else {
          this.handleParsedXml(result);
          resolve();
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleParsedXml(jsonObj: any): void {
    if (jsonObj.hasOwnProperty("iq")) {
      console.log("----------------------");
      if (!jsonObj.iq?.query?.length) {
        return;
      }
      const xmlns = jsonObj.iq?.query[0]?.$?.xmlns;
      if (xmlns === "jabber:iq:privacy") {
        // console.log(jsonObj.iq?.query[0]?.list);
      }
      if (xmlns === "jabber:iq:riotgames:roster") {
        this.handleFriendList(jsonObj.iq?.query[0]?.item);
      }

      console.log("----------------------");
    }
    if (jsonObj.hasOwnProperty("message")) {
      const { id, from, to, stamp, type } = jsonObj.message.$;
      const message = jsonObj.message.body[0];
      console.log({ id, from, to, stamp, type, message });
      console.log("----------------------");
    }
    if (jsonObj.hasOwnProperty("presence")) {
    }
  }

  private handleFriendList(players) {
    this.friendList = [];

    for (const player of players) {
      const { jid, puuid, name } = player?.$;
      const state = player?.state[0];
      const lastOnline = player.last_online[0];
      const internalName = player.id[0].$.name;
      const tagline = player.id[0].$.tagline;
      this.friendList.push({ jid, puuid, name, state, lastOnline, internalName, tagline });
    }
  }
}

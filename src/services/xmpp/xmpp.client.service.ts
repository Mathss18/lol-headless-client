import tls, { connect } from "tls";
import { REGION } from "../../config/regions";

export class XmppClient {
  private socket: tls.TLSSocket;
  private heartbeat: NodeJS.Timeout;
  private presenceCache: any;
  constructor(private rsoToken: string, private pasToken: string) {
    console.log("XmppClient created");
  }
  connect() {
    try {
      this.presenceCache = {};

      const address = REGION.xmppUrl;
      const port = 5223;
      const xmppRegion = REGION.regionLower;

      const messages = [
        `<?xml version="1.0"?><stream:stream to="${xmppRegion}.pvp.net" version="1.0" xmlns:stream="http://etherx.jabber.org/streams">`,
        "",
        `<auth mechanism="X-Riot-RSO-PAS" xmlns="urn:ietf:params:xml:ns:xmpp-sasl"><rso_token>${this.rsoToken}</rso_token><pas_token>${this.pasToken}</pas_token></auth>`,
        `<?xml version="1.0"?><stream:stream to="${xmppRegion}.pvp.net" version="1.0" xmlns:stream="http://etherx.jabber.org/streams">`,
        "",
        '<iq id="_xmpp_bind1" type="set"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"></bind></iq>',
        '<iq id="_xmpp_session1" type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"/></iq>',
        '<iq type="get" id="2"><query xmlns="jabber:iq:riotgames:roster" last_state="true" /></iq>', // get friends list
        '<iq id="roster_add_1" type="set"><query xmlns="jabber:iq:riotgames:roster"><item subscription="pending_out"><id name="PresentesLOL" tagline="1033"></id></item></query></iq>',
        "<presence/>",
      ];

      const sock = connect(port, address, {}, () => {
        try {
          console.log("Connected!");

          sendNext();
        } catch (e) {
          console.log(e);
        }
      });
      this.socket = sock;

      const send = (data) => {
        try {
          if (sock.readyState === "open")
            sock.write(data, "utf8", () => {
              if (data !== " ") console.log("-> " + data);
            });

          this.heartbeat = setTimeout(() => send(" "), 150_000);
        } catch (e) {
          console.log(e);
        }
      };

      const sendNext = () => send(messages.shift());

      let bufferedMessage = "";

      sock.on("data", (data) => {
        try {
          data = data.toString();
          console.log("<- " + data);
          if (messages.length > 0) sendNext();

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

            if (firstTagName === "presence") {
              processXMLData(data, this.presenceCache);
            } else if (firstTagName === "iq") {
              if (data.includes("jabber:iq:riotgames:roster")) processFriendsList(data);
              //   } else if (data.includes("_xmpp_session") && data.includes("urn:ietf:params:xml:ns:xmpp-session")) {
              //     this.processOwnUsername(data, this.decodeToken(PAS).sub);
              //   }
            } else if (firstTagName === "failure") {
              const errorStartIndex = data.indexOf(">") + 1;
              const error = data.substring(errorStartIndex, closingTagIndex);
              if (data.includes("token-expired")) {
                // BdApi.alert("token expired!")
                console.log(error);
                // this.restart();
              } else {
                console.error(data);
                console.log("Riot XMPP Connection failed! " + data);
                // this.destroy();
              }
            }

            data = "";
          }
        } catch (e) {
          console.log(e);
        }
      });

      sock.on("error", console.error);
      sock.on("close", () => {
        // if (!this.enabled) return console.log("Socket disconnected!");

        console.error("Riot Connection Closed! Retrying in 5 seconds...");

        clearTimeout(this.heartbeat);
      });
    } catch (e) {
      console.log(e);
    }
    console.log("XmppClient connected");
  }
  disconnect() {
    console.log("XmppClient disconnected");
  }
}

function processXMLData(data, presenceCache) {
  try {
    const puuid = data.substr(16, 36);

    // extract lol presence
    const lolData = extractDataFromXML(data, "league_of_legends");
    if (lolData) {
      const presenceUnparsed = extractDataFromXML(lolData, "p");
      if (presenceUnparsed) {
        // regalia is an object within the object, causes issues with parser
        const presenceHalfParsed = presenceUnparsed
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, '"')
          .replace(/"regalia":.+}",/, "");
        try {
          const presenceData = JSON.parse(presenceHalfParsed);
          const timestamp = extractDataFromXML(lolData, "s.t");
          const status = extractDataFromXML(lolData, "st");
          console.log({ presenceData });
          // this.processPresenceData(puuid, presenceData, status, timestamp);
        } catch (e) {
          console.error(data);
          console.log("Could not JSON parse Lol presence data!" + e);
        }
      }
    } else {
      const previousPresence = presenceCache[puuid];
      delete presenceCache[puuid];
    }
  } catch (e) {
    console.error(data);
    console.log(e);
  }
}

function extractDataFromXML(xml, tagName, startIndex?: number, endIndex?: number) {
  const dataStartIndex = xml.indexOf(`<${tagName}>`, startIndex, endIndex);
  const dataEndIndex = xml.indexOf(`</${tagName}>`, dataStartIndex, endIndex);
  if (dataStartIndex >= 0 && dataEndIndex > dataStartIndex) {
    const data = xml.substring(dataStartIndex + tagName.length + 2, dataEndIndex);
    if (data) return data;
  }
}

function processFriendsList(data) {
  console.log({ data });
  const queryTag = data.substring(
    data.indexOf("<query xmlns='jabber:iq:riotgames:roster'>") + 42,
    data.indexOf("</query>")
  );
  const items = queryTag.split("</item>");

  for (const item of items) {
    if (!item) continue;

    const puuid = item.substr(11, 36);

    // riot ID
    const idTagIndex = item.indexOf("<id ");

    const usernameIndex = item.indexOf("name=", idTagIndex) + 6;
    const username = item.substring(usernameIndex, item.indexOf("' ", usernameIndex));

    const taglineIndex = item.indexOf("tagline=", idTagIndex) + 9;
    const tagline = item.substring(taglineIndex, item.indexOf("'/>", taglineIndex));

    console.log(`${username}#${tagline}`);

    // lol summoner name
    const lolTagIndex = item.indexOf("<lol ");

    // if (lolTagIndex > -1) {
    //   const lolNameIndex = item.indexOf("name=", lolTagIndex) + 6;
    //   const lolName = item.substring(lolNameIndex, item.indexOf("'", lolNameIndex));

    //   this.riotPUUIDToSummonerName[puuid] = lolName;
    // }
  }
}

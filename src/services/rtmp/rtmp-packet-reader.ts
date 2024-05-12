import { ChampionName } from "../../enums/champion.enum";
import { Logger } from "../../utils/logger.util";
import { AMFDecoder } from "./amf/amf-decoder";
import { RtmpClient } from "./rtmp-client.service";
import { RtmpPacket } from "./rtmp-packet";
import TypedObject from "./typed-object";
import { gunzipSync } from "zlib";

export class RtmpPacketReader {
  public packets: Map<string, TypedObject> = new Map();
  private decoder = new AMFDecoder();
  private tag: string | null = null;
  constructor(private client: RtmpClient) {}

  public handleReceivedData(data: Buffer): void {
    let offset = 0;
    const map: Map<number, RtmpPacket> = new Map();

    while (offset < data.length) {
      const initialHeader = data[offset++];
      const channel = initialHeader & 0x2f;
      const headerType = initialHeader & 0xc0;

      let headerSize = 0;
      if (headerType === 0x00) {
        headerSize = 12;
      } else if (headerType === 0x40) {
        headerSize = 8;
      } else if (headerType === 0x80) {
        headerSize = 4;
      } else if (headerType === 0xc0) {
        headerSize = 1;
      }

      if (!map.has(channel)) map.set(channel, new RtmpPacket(initialHeader));
      const packet = map.get(channel);

      if (headerSize > 1) {
        const header = Buffer.alloc(headerSize - 1);
        packet.setHeaderSize(header.length);
        for (let i = 0; i < header.length; i++) {
          header[i] = data[offset++];
          packet.addToHeader(header[i]);
        }

        if (headerSize >= 8) {
          let size = 0;
          for (let i = 3; i < 6; i++) {
            size = size * 256 + (header[i] & 0xff);
          }
          packet.setBodySize(size);
          packet.setMessageType(header[6]);
        }
      }

      for (let i = 0; i < 128; i++) {
        const b = data[offset++];
        packet.addToBody(b);
        if (packet.isComplete()) break;
      }

      // Rest of the code processing the packet
      if (packet.isComplete()) {
        this.handleRtmpPacket(packet);
        map.delete(channel);
      }
    }
  }

  public getPacketByTag(tag: string): TypedObject {
    return this.packets.get(tag);
  }

  public setTag(tag: string): void {
    this.tag = tag;
  }

  private handleRtmpPacket(packet: RtmpPacket): void {
    const messageType = packet.getMessageType();
    if (messageType === undefined) return;
    let result: TypedObject;
    switch (messageType) {
      case 0x01: // Set Chunk Size
        // Handle Set Chunk Size message
        break;
      case 0x03: // Acknowledgement
        // Handle Acknowledgement message
        break;
      case 0x04: // User Control Message
        // Handle User Control Message
        break;
      case 0x05: // Window Acknowledgement Size
        // Handle Window Acknowledgement Size message
        break;
      case 0x06: // Set Peer Bandwidth
        // Handle Set Peer Bandwidth message
        break;
      case 0x08: // Audio Message
        // Handle Audio Message
        break;
      case 0x09: // Video Message
        // Handle Video Message
        break;
      case 0x11: // AMF3 Command Message
        result = this.decoder.decode(
          packet.getBody(),
          new TypedObject("Invoke")
        );
        break;
      case 0x14: // AMF0 Command Message
        result = this.decoder.decode(
          packet.getBody(),
          new TypedObject("Connect")
        );
        break;
      default:
        console.warn(`Unhandled RTMP message type: ${messageType}`);
    }
    if (!result) return;
    process.env?.RTMP_LOGS === "true" && console.log(result);

    // packet actions
    this.setDsid(result);
    this.setTagFromResult(result);
    this.championSelectActions(result);
  }

  private setDsid(result: TypedObject) {
    if (this.client.DSId) return;
    if (result.getTypedObject("data").getString("id")) {
      this.client.DSId = result.getTypedObject("data").getString("id");
      Logger.magenta(`[RTMP] DSiD: ${this.client.DSId} \n`);
    }
  }

  private setTagFromResult(result: TypedObject): void {
    if (this.tag) {
      this.packets.set(this.tag, result);
      this.tag = null;
    }
  }

  private championSelectActions(result: TypedObject): void {
    const body = result.getTypedObject("data")?.getTypedObject("body");
    const isMethodName = body?.getString("methodName") === "tbdGameDtoV1";
    const isServiceName =
      body?.getString("serviceName") === "teambuilder-draft";

    if (!isMethodName || !isServiceName) return;
    // if (this.client.pickState.isChampPicked) return;

    const compresed = body.getString("payload");
    const state = this.decodeGzipBase64(compresed).championSelectState;

    const subphase: string = state.subphase;
    const actionSetList: Array<any> = state.actionSetList;
    const playerCellId: number = state.localPlayerCellId;
    const currentActionIndex: number = state.currentActionSetIndex;

    if (subphase === "GAME_STARTING") {
      this.client.pickState.gameStarted = true;
      Logger.green("=== Game started! ===");
      return;
    }

    this.client.pickState.isMyTurnToPick = this.isMyTurnToPickOrBan(
      actionSetList,
      playerCellId,
      currentActionIndex,
      "PICK"
    );

    this.client.pickState.isMyTurnToBan = this.isMyTurnToPickOrBan(
      actionSetList,
      playerCellId,
      currentActionIndex,
      "BAN"
    );

    this.myPickPhaseActions(actionSetList, playerCellId);
    this.myBanPhaseActions(actionSetList, playerCellId);
  }

  private decodeGzipBase64(input: string): any {
    const buffer = Buffer.from(input, "base64");
    const decompressed = gunzipSync(buffer);
    return JSON.parse(decompressed.toString());
  }

  private myBanPhaseActions(actionSetList: any[], myCellId: number): void {
    if (this.client.pickState.bannedChampion) return; // if already banned champion, return
    for (const group of actionSetList) {
      for (const item of group) {
        if (item.actorCellId === myCellId && item.type === "BAN") {
          this.client.pickState.banActionId = item.actionId;
          Logger.green(`Ban actionID ${this.client.pickState.banActionId} \n`);
          if (item.completed === true) {
            this.client.pickState.isChampBanned = true;
            this.client.pickState.bannedChampion = item.championId;
            Logger.red(`Banned champion: ${ChampionName[item.championId]}\n`);
          }
        }
      }
    }
  }
  private myPickPhaseActions(actionSetList: any[], myCellId: number): void {
    if (this.client.pickState.isChampPicked) return; // if already picked champion, return
    for (const group of actionSetList) {
      for (const item of group) {
        if (item.actorCellId === myCellId && item.type === "PICK") {
          this.client.pickState.pickActionId = item.actionId;
          Logger.green(
            `Pick actionID ${this.client.pickState.pickActionId} \n`
          );
          if (item.completed === true) {
            this.client.pickState.isChampPicked = true;
            this.client.pickState.pickedChampion = item.championId;
            Logger.green(`Picked champion: ${ChampionName[item.championId]}\n`);
          }
        }
      }
    }
  }

  private isMyTurnToPickOrBan(
    state: any[],
    actorCellId: number,
    actionSetIndex: number,
    type: "PICK" | "BAN"
  ): boolean {
    if (actionSetIndex === -1) return false; // if actionSetIndex is -1, it means that the game has not started yet (in planning phase)
    const currentActionSet = state[actionSetIndex];

    for (const action of currentActionSet) {
      if (action.actorCellId === actorCellId && action.type === type) {
        Logger.green(`Is my turn to ${type} \n`);
        return true;
      }
    }

    return false;
  }
}

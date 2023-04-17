import { AMFDecoder } from "./amf-decoder";
import { RtmpClient } from "./rtmp-client.service";
import { RtmpPacket } from "./rtmp-packet";
import TypedObject from "./typed-object";

export class RtmpPacketReader {
  private packets: Map<number, RtmpPacket> = new Map();
  private decoder = new AMFDecoder();
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

  private handleRtmpPacket(packet: RtmpPacket): void {
    const messageType = packet.getMessageType();
    if (messageType === undefined) return;
    console.log(`Received RTMP message type: ${messageType}`);
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
        this.handleSetPeerBandwidth(packet);
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
    if (result) {
      if (result.getTypedObject("data").getString("id")) {
        this.client.DSId = result.getTypedObject("data").getString("id");
        console.log(`ID: ${result.getTypedObject("data").getString("body")}`)
      }
      else{
        console.log(result.getTypedObject("data").getString("body"))
      }
    }
  }

  private handleSetPeerBandwidth(packet: RtmpPacket): void {
    const buffer = packet.getBody();
    const windowSize = buffer.readUInt32BE(0);
    const limitType = buffer.readUInt8(4);

    // Update your client's bandwidth settings here
    console.log(
      `Server set peer bandwidth: windowSize = ${windowSize}, limitType = ${limitType}`
    );
  }

  private getDSid(packet: RtmpPacket): string | null {
    const packetBodyStr = packet.getBody().toString();

    // Regular expression to search for the ID pattern
    const idRegex =
      /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/;

    // Extract the ID using the regex
    const idMatch = packetBodyStr.match(idRegex);
    return idMatch ? idMatch[0] : null;
  }
}

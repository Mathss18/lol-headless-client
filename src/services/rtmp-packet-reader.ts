import { RtmpClient } from "./rtmp-client.service";

export class RtmpPacketReader {
//   private decoder = new AMFDecoder();
  constructor(private client: RtmpClient) {}
}

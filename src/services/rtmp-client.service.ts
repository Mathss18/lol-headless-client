import * as net from "net";
import * as tls from "tls";
import * as crypto from "crypto";
import { Handshake } from "./handshake";
import { RtmoInfoBuilder } from "./rtmp-info.builder";
import { toAMF } from "amf-codec";
import { once } from "events";
import { AMFEncoder } from "./amf-encoder";

export class RtmpClient {
  private socket!: tls.TLSSocket;
  private rtmpConnected: boolean;
  private baseRtmpInfo: RtmoInfoBuilder;

  constructor(private host: string, private port: number) {
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
        const amtEncoder = new AMFEncoder();
        console.log('My implementation encode')
        console.log(amtEncoder.encodeConnect(rtmpConnectInfo.getMap()).toString())

        // console.log('Third lib toAMF')
        // console.log(toAMF(rtmpConnectInfo.getMap()))
        await this.write(amtEncoder.encodeConnect(rtmpConnectInfo.getMap()));
        // Handle response from server
        this.socket.once("data", async (data: Buffer) => {
          const response = this.processRtmpData(data);
          console.log(response.toString());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Replace the return type and implementation with your actual requirements
  processRtmpData(data: Buffer): any {
    return data;
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

  public async send() {
    // Implement RTMP message sending here.
  }

  public async receive() {
    // Implement RTMP message receiving here.
  }

  public async close() {
    this.socket.destroy();
  }
}

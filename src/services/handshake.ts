import { Transform } from "stream";
import * as crypto from "crypto";

const HANDSHAKE_STATE_UNINITIALIZED = 0;
const HANDSHAKE_STATE_VERSION_SENT = 1;
const HANDSHAKE_STATE_ACK_SENT = 2;
const HANDSHAKE_STATE_DONE = 3;

const HANDSHAKE_LENGTH_VERSION = 1;
const HANDSHAKE_LENGTH_TIME = 4;
const HANDSHAKE_LENGTH_ECHO = 4;
const HANDSHAKE_LENGTH_RANDOM = 1528;

const HANDSHAKE_LENGTH_HEAD = HANDSHAKE_LENGTH_TIME + HANDSHAKE_LENGTH_ECHO;
const HANDSHAKE_LENGTH = HANDSHAKE_LENGTH_HEAD + HANDSHAKE_LENGTH_RANDOM;

const getUnixTime = () => Math.trunc(Date.now() / 1000);

const C0 = (version = 3): Buffer => {
  return Buffer.from([version]);
};

const S0 = C0;

const C1 = (): Buffer => {
  const buf = Buffer.allocUnsafe(HANDSHAKE_LENGTH_HEAD);

  buf.writeUInt32BE(getUnixTime(), 0);
  buf.writeUInt32BE(0, HANDSHAKE_LENGTH_TIME);

  return Buffer.concat([buf, crypto.randomBytes(1528)]);
};

const S1 = C1;

const C2 = (prev: Buffer): Buffer => {
  const time = prev.readUInt32BE(0);
  const random = prev.slice(HANDSHAKE_LENGTH_HEAD);

  const buf = Buffer.allocUnsafe(HANDSHAKE_LENGTH_HEAD);

  buf.writeUInt32BE(time, 0);
  buf.writeUInt32BE(getUnixTime(), HANDSHAKE_LENGTH_TIME);

  return Buffer.concat([buf, random]);
};

const S2 = C2;

export class Handshake extends Transform {
  private buffers: Buffer[] = [];
  private state = HANDSHAKE_STATE_UNINITIALIZED;
  private c0 = C0();
  private c1 = C1();
  private c2!: Buffer;

  public initialize(socket: any): void {
    this.once("done", () => {
      this.unpipe(socket);
      socket.unpipe(this);
    });
    this.pipe(socket).pipe(this);

    socket.write(Buffer.concat([this.c0, this.c1]));
    this.state = HANDSHAKE_STATE_VERSION_SENT;
  }

  private getBufferLength(chunkLength = 0): number {
    return this.buffers.reduce((memo, buf) => memo + buf.length, chunkLength);
  }

  _transform(chunk: any, encoding: any, callback: any) {
    try {
      console.log("Handshake _transform state:", this.state); // Add logging of the current state

      if (this.state === HANDSHAKE_STATE_DONE) {
        this.push(chunk);
        return callback();
      } else if (
        this.state === HANDSHAKE_STATE_VERSION_SENT &&
        this.getBufferLength(chunk.length) > HANDSHAKE_LENGTH
      ) {
        const buf = Buffer.concat(this.buffers.concat(chunk));
        this.buffers = [buf.slice(HANDSHAKE_LENGTH + HANDSHAKE_LENGTH_VERSION)];

        const s0 = buf.slice(0, HANDSHAKE_LENGTH_VERSION);
        if (Buffer.compare(this.c0, s0)) {
          this.emit("error");
          return;
        }

        const s1 = buf.slice(
          HANDSHAKE_LENGTH_VERSION,
          HANDSHAKE_LENGTH + HANDSHAKE_LENGTH_VERSION
        );
        this.c2 = C2(s1);
        this.state = HANDSHAKE_STATE_ACK_SENT;

        this.push(this.c2);
        this._transform(Buffer.allocUnsafe(0), encoding, callback);
      } else if (
        this.state === HANDSHAKE_STATE_ACK_SENT &&
        this.getBufferLength(chunk.length) >= HANDSHAKE_LENGTH
      ) {
        const buf = Buffer.concat(this.buffers.concat(chunk));
        this.buffers = [];

        const s2 = buf.slice(HANDSHAKE_LENGTH_HEAD, HANDSHAKE_LENGTH);
        if (Buffer.compare(this.c1.slice(HANDSHAKE_LENGTH_HEAD), s2)) {
          this.emit("error");
          return;
        }

        this.state = HANDSHAKE_STATE_DONE;
        this.emit("done");

        return callback();
      } else {
        this.buffers.push(chunk);
        return callback();
      }
    } catch (err) {
      return callback(err);
    }
  }
}

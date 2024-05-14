/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import { PropertyMap } from "../rtmp-info.builder";
import { AMF0Type } from "./amf0-type";
import { AMF3Type } from "./amf3-type";
import TypedObject from "../typed-object";
export class AMFEncoder {
  private buffer: Buffer = Buffer.alloc(0);
  private timestamp: number = Date.now();

  public encodeInvoke(id: number, data: any): Buffer {
    this.buffer = Buffer.alloc(0);
    this.writeByte(0x00);
    this.writeByte(0x05);
    this.writeAMF0Integer(id);
    this.writeByte(0x05);
    this.writeByte(AMF0Type.AMF3);
    this.encode(data);
    this.addHeader();
    return this.buffer;

  }

  public encodeConnect(map: PropertyMap): Buffer {
    this.buffer = Buffer.alloc(0);
    this.writeAMF0UTF8String("connect");
    this.writeAMF0Integer(1);
    this.writeByte(AMF0Type.AMF3);
    this.writeByte(AMF3Type.ARRAY);
    this.writeAMF3AssociativeArray(map);
    this.writeBytes(0x01, 0x00);
    this.writeAMF0UTF8String("nil");
    this.writeAMF0UTF8String("");
    const commandMessage = new TypedObject(
      "flex.messaging.messages.CommandMessage"
    );
    commandMessage.set("messageRefType", null);
    commandMessage.set("operation", 5);
    commandMessage.set("correlationId", "");
    commandMessage.set("clientId", null);
    commandMessage.set("destination", "");
    commandMessage.set("messageId", this.generateUUID());
    commandMessage.set("timestamp", 0);
    commandMessage.set("timeToLive", 0);
    commandMessage.set("body", new TypedObject());
    const headers: Map<string, unknown> = new Map();
    headers.set("DSMessagingVersion", 1);
    headers.set("DSId", "my-rtmp");
    commandMessage.set("headers", headers);
    this.writeByte(0x11);
    this.encode(commandMessage);
    this.addHeader();
    this.buffer[7] = 0x14;
    return this.buffer;
  }

  addHeader(): void {
    const header = Buffer.alloc(12);
    header[0] = 0x03;
    const timeOffset = Date.now() - this.timestamp;
    header[1] = (timeOffset & 0xff0000) >> 16;
    header[2] = (timeOffset & 0x00ff00) >> 8;
    header[3] = timeOffset & 0x0000ff;
    header[4] = (this.buffer.length & 0xff0000) >> 16;
    header[5] = (this.buffer.length & 0x00ff00) >> 8;
    header[6] = this.buffer.length & 0x0000ff;
    header[7] = 0x11;
    header[8] = 0x00;
    header[9] = 0x00;
    header[10] = 0x00;
    header[11] = 0x00;

    const list: number[] = [];
    for (let i = 0; i < this.buffer.length; i++) {
      list.push(this.buffer[i]);
      if (i % 128 === 127 && i !== this.buffer.length - 1) {
        list.push(0xc3);
      }
    }

    const bytes = Buffer.alloc(header.length + list.length);
    header.copy(bytes, 0);
    for (let i = 0; i < list.length; i++) {
      bytes[header.length + i] = list[i];
    }
    this.buffer = bytes;
  }

  private generateUUID(): string {
    return uuidv4();
  }

  encode(o: any): void {
    if (o === null) {
      this.writeByte(AMF3Type.NULL);
    } else if (typeof o === "boolean") {
      const type = o ? AMF3Type.BOOLEAN_TRUE : AMF3Type.BOOLEAN_FALSE;
      this.writeByte(type);
    } else if (typeof o === "number" && Number.isInteger(o)) {
      this.writeByte(AMF3Type.INTEGER);
      this.writeAMF3Integer(o);
    } else if (typeof o === "number") {
      this.writeByte(AMF3Type.DOUBLE);
      this.writeAMF3Double(o);
    } else if (typeof o === "string") {
      this.writeByte(AMF3Type.STRING);
      this.writeAMF3StringUTF8(o);
    } else if (o instanceof Date) {
      this.writeByte(AMF3Type.DATE);
      this.writeAMF3Date(o);
    } else if (Buffer.isBuffer(o)) {
      this.writeByte(AMF3Type.BYTEARRAY);
      //   this.writeAMF3ByteArray(o);
    } else if (Array.isArray(o)) {
      this.writeByte(AMF3Type.ARRAY);
      this.writeAMF3Array(o);
    } else if (o instanceof TypedObject) {
      this.writeByte(AMF3Type.OBJECT);
      this.writeAMF3TypedObject(o);
    } else if (o instanceof Map) {
      this.writeByte(AMF3Type.ARRAY);
      this.writeAMF3AssociativeArray(o);
    } else {
      throw new Error("Unexpected type: " + typeof o);
    }
  }

  writeAMF3Double(value: number): void {
    if (isNaN(value)) {
      this.writeBytes(0x7f, 0xff, 0xff, 0xff, 0xe0, 0x00, 0x00, 0x00);
    } else {
      const tmp = Buffer.alloc(8);
      const b = Buffer.alloc(this.buffer.length + tmp.length);
      this.buffer.copy(b, 0, 0, this.buffer.length);
      tmp.writeDoubleBE(value, 0);
      tmp.copy(b, this.buffer.length, 0, tmp.length);
      this.buffer = b;
    }
  }

  writeAMF3Date(date: Date): void {
    this.writeByte(0x01);
    this.writeAMF3Double(date.getTime());
  }

  writeAMF3ByteArray(bytes: any[]) {
    throw new Error("Encoding byte arrays is not implemented");
  }

  writeAMF0UTF8String(text: string): void {
    const required = 3 + text.length;
    const b = Buffer.alloc(this.buffer.length + required);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    b[this.buffer.length] = AMF0Type.STRING;
    b.writeUInt16BE(text.length, this.buffer.length + 1);
    b.write(text, this.buffer.length + 3, text.length, "utf8");
    this.buffer = b;
  }

  writeAMF0Integer(number: number): void {
    const b = Buffer.alloc(this.buffer.length + 9);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    b[this.buffer.length] = AMF0Type.NUMBER;
    const tmp = Buffer.alloc(8);
    tmp.writeDoubleBE(number, 0);
    tmp.copy(b, this.buffer.length + 1, 0, tmp.length);
    this.buffer = b;
  }

  writeByte(b: number): void {
    this.writeBytes(b);
  }

  writeBytes(...bytes: number[]): void {
    const b = Buffer.alloc(this.buffer.length + bytes.length);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    for (let i = 0; i < bytes.length; i++) {
      b[this.buffer.length + i] = bytes[i];
    }
    this.buffer = b;
  }

  writeAMF3AssociativeArray(map: PropertyMap): void {
    this.writeByte(0x01);
    for (const [key, value] of Object.entries(map)) {
      this.writeAMF3StringUTF8(key);
      this.encode(value);
    }
    this.writeByte(0x01);
  }

  writeAMF3StringUTF8(text: string): void {
    const bytes = Buffer.from(text, "utf8");
    this.writeAMF3Integer((bytes.length << 1) | 1);
    const b = Buffer.alloc(this.buffer.length + bytes.length);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    bytes.copy(b, this.buffer.length, 0, bytes.length);
    this.buffer = b;
  }

  writeAMF3Integer(value: number): void {
    if (value >= 0x200000 || value < 0) {
      this.writeBytes(
        ((value >> 22) & 0x7f) | 0x80,
        ((value >> 15) & 0x7f) | 0x80,
        ((value >> 8) & 0x7f) | 0x80,
        value & 0xff
      );
    } else {
      if (value >= 0x4000) {
        this.writeByte(((value >> 14) & 0x7f) | 0x80);
      }
      if (value >= 0x80) {
        this.writeByte(((value >> 7) & 0x7f) | 0x80);
      }
      this.writeByte(value & 0x7f);
    }
  }

  writeAMF3Array(arr: unknown[]): void {
    this.writeAMF3Integer((arr.length << 1) | 1);
    this.writeByte(0x01);
    for (const o of arr) {
      this.encode(o);
    }
  }

  writeAMF3TypedObject(typedObject: TypedObject): void {
    const type = typedObject.getType();
    if (type === null || type === "") {
      this.writeBytes(0x0b, 0x01);
      for (const key of typedObject.keys()) {
        this.writeAMF3StringUTF8(key);
        this.encode(typedObject.get(key));
      }
      this.writeByte(0x01);
    } else if (type === "flex.messaging.io.ArrayCollection") {
      this.writeByte(0x07);
      this.writeAMF3StringUTF8(type);
      this.encode(typedObject.get("array"));
    } else {
      this.writeAMF3Integer((typedObject.size << 4) | 3);
      this.writeAMF3StringUTF8(type);
      const list: string[] = [];
      for (const key of typedObject.keys()) {
        this.writeAMF3StringUTF8(key);
        list.push(key);
      }
      for (const key of list) this.encode(typedObject.get(key));
    }
  }
}

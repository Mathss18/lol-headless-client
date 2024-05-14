/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { AMF0Type } from "./amf0-type";
import { Temporal } from "@js-temporal/polyfill";
import { AMF3Type } from "./amf3-type";
import TypedObject from "../typed-object";

export class AMFDecoder {
  private data: Buffer;
  private position: number;
  private classListAMF3: any[] = [];
  private objectListAMF0: any[] = [];
  private objectListAMF3: any[] = [];
  private stringListAMF3: any[] = [];

  private resetAMF0(): void {
    this.objectListAMF0 = [];
  }

  private read(): number {
    return this.data[this.position++];
  }

  private readBytes(l: number): Buffer {
    const b = Buffer.alloc(l);
    for (let i = 0; i < l; i++) {
      b[i] = this.read();
    }
    return b;
  }

  private readNumberAMF0(): number {
    return this.readDouble();
  }

  private readByteAsInteger(): number {
    return (this.read() & 0xff) >>> 0;
  }

  private readDouble(): number {
    let value: bigint = 0n;
    for (let i = 0; i < 8; i++)
      value = (value << 8n) + BigInt(this.readByteAsInteger());

    return this.longBitsToDouble(value);
  }

  longBitsToDouble(value: bigint): number {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, value, false); // false for Big Endian
    return view.getFloat64(0, false);
}

  private readBooleanAMF0(): boolean {
    return this.readBoolean();
  }

  private readBoolean(): boolean {
    return this.read() === 1;
  }

  private readUTF8StringAMF0(): string {
    const length = (this.readByteAsInteger() << 8) | this.readByteAsInteger();
    return length !== 0 ? this.readBytes(length).toString("utf-8") : "";
  }

  private readAMF0Pair(): [string, any] {
    const key = this.readUTF8StringAMF0();
    const object = this.decodeAMF0();
    return [key, object];
  }

  private readObjectAMF0(): TypedObject {
    const object = new TypedObject();
    let pair: [string, any];
    do {
      pair = this.readAMF0Pair();
      object.set(pair[0], pair[1]);
    } while (!(pair[1] instanceof ObjectTerminateAMF0));
    return object;
  }

  private readNullAMF0() {
    return null;
  }

  private readTypeReferenceAMF0(): any {
    const index = (this.readByteAsInteger() << 8) | this.readByteAsInteger();
    const reference = this.objectListAMF0[index];
    return reference;
  }

  private readObjectTermAMF0() {
    return ObjectTerminateAMF0.INSTANCE;
  }

  private storeObjectAMF0(object: any): void {
    this.objectListAMF0.push(object);
  }

  private readInteger(): number {
    let value = 0;
    for (let i = 0; i < 4; i++) {
      value = (value << 8) + this.readByteAsInteger();
    }
    return value;
  }

  private readArrayAMF0(): any[] {
    const entries = this.readInteger();
    const objects: any[] = new Array(entries);
    this.storeObjectAMF0(objects);
    for (let i = 0; i < entries; i++) {
      objects[i] = this.decodeAMF0();
    }
    return objects;
  }

  private readDateAMF0(): Temporal.PlainDateTime {
    const timestamp = this.readNumberAMF0();
    const length =
      ((this.readByteAsInteger() << 8) | this.readByteAsInteger()) / 60;
    const offsetSign = length >= 0 ? "+" : "-";
    const offsetHours = Math.abs(length).toString().padStart(2, "0");
    const timeZone = Temporal.TimeZone.from(`${offsetSign}${offsetHours}:00`);
    const calendar = Temporal.Calendar.from("iso8601");
    const zonedDateTime = Temporal.Instant.fromEpochMilliseconds(
      timestamp
    ).toZonedDateTime({ timeZone, calendar });
    return zonedDateTime.toPlainDateTime();
  }

  private readTypedObjectAMF0(): TypedObject {
    const object = new TypedObject();
    this.storeObjectAMF0(object);
    object.set(this.readUTF8StringAMF0(), this.readObjectAMF0());
    return object;
  }

  private readUndefinedAMF3() {
    return "AMF3_UNDEFINED";
  }

  private readNullAMF3() {
    return null;
  }

  private readBooleanFalseAMF3() {
    return false;
  }

  private readBooleanTrueAMF3() {
    return true;
  }

  private readIntegerAMF3(): number {
    let result = 0;
    let n = 0;
    let b = this.readByteAsInteger();
    while ((b & 0x80) !== 0 && n < 3) {
      result <<= 7;
      result |= b & 0x7f;
      b = this.readByteAsInteger();
      n++;
    }
    if (n < 3) {
      result <<= 7;
      result |= b;
    } else {
      result <<= 8;
      result |= b;
      if ((result & 0x10000000) !== 0) result |= 0xe0000000;
    }
    return result;
  }

  private readDoubleAMF3() {
    return this.readDouble();
  }

  private getStoredStringAMF3(index: number): string {
    return this.stringListAMF3[index];
  }

  private storeStringAMF3(string: string): void {
    this.stringListAMF3.push(string);
  }

  private readUTF8StringAMF3(): string {
    let result: string;
    const type = this.readIntegerAMF3();
    if ((type & 0x01) === 0) result = this.getStoredStringAMF3(type >> 1);
    else {
      const length = type >> 1;
      if (length > 0) {
        const bytes = this.readBytes(length);
        try {
          result = bytes.toString("utf-8");
        } catch (error) {
          if (error instanceof TypeError) {
            throw new Error("Malformed input: " + error.message);
          } else {
            throw error;
          }
        }
        this.storeStringAMF3(result);
      } else {
        result = "";
      }
    }
    return result;
  }

  private getStoredObjectAMF3(index: number): any {
    return this.objectListAMF3[index];
  }

  private storeObjectAMF3(object: any): void {
    this.objectListAMF3.push(object);
  }

  private readDateAMF3() {
    throw new Error("Method not implemented.");
  }

  private readArrayAMF3(): any[] {
    const type: number = this.readIntegerAMF3();
    if ((type & 0x01) === 0) {
      return this.getStoredObjectAMF3(type >> 1) as any[];
    } else {
      const size: number = type >> 1;
      const key: string = this.readUTF8StringAMF3();
      if (key.length === 0) {
        const objects: any[] = new Array(size);
        this.storeObjectAMF3(objects);
        for (let i = 0; i < size; i++) {
          objects[i] = this.decodeAMF3();
        }
        return objects;
      } else {
        throw new Error("Associative arrays are not supported");
      }
    }
  }

  private storeClassDefinitionAMF3(classDefinition: ClassDefinition) {
    this.classListAMF3.push(classDefinition);
  }
  private getStoredClassDefinitionAMF3(index: number): ClassDefinition {
    return this.classListAMF3[index];
  }

  private readFlagData(): number[] {
    const flags: number[] = [];
    let flag: number;
    do {
      flags.push((flag = this.readByteAsInteger()));
    } while ((flag & 0x80) !== 0);
    return flags;
  }

  private readRemaining(flag: number, bits: number): void {
    if (flag >> bits !== 0) {
      for (let i = bits; i < 6; i++) {
        if (((flag >> i) & 1) !== 0) {
          const o = this.decodeAMF3();
          console.log(`Ignoring AMF3 ${o}`);
        }
      }
    }
  }

  private convertByteArrayToId(bytes: number[]): string {
    const builder: string[] = [];
    for (let i = 0; i < bytes.length; i++) {
      if (i === 4 || i === 6 || i === 8 || i === 10) builder.push("-");
      builder.push(bytes[i].toString(16).padStart(2, "0"));
    }
    return builder.join("");
  }

  private readDSK(): TypedObject {
    const typedObject = this.readDSA();
    const flags = this.readFlagData();
    flags.forEach((flag) => {
      this.readRemaining(flag, 0);
    });
    return typedObject;
  }

  private readByteArrayAMF3(): Uint8Array {
    const type = this.readIntegerAMF3();
    if ((type & 0x01) === 0) {
      return this.getStoredObjectAMF3(type >> 1) as Uint8Array;
    } else {
      const bytes = this.readBytes(type >> 1);
      const uint8Array = new Uint8Array(bytes);
      this.storeObjectAMF3(uint8Array);
      return uint8Array;
    }
  }

  private readDSA(): TypedObject {
    const typedObject = new TypedObject("DSA");
    const flags = this.readFlagData();
    for (let i = 0; i < flags.length; i++) {
      const flag = flags[i];
      let bits = 0;
      if (i === 0) {
        if ((flag & 0x01) !== 0) typedObject.set("body", this.decodeAMF3());
        if ((flag & 0x02) !== 0) typedObject.set("clientId", this.decodeAMF3());
        if ((flag & 0x04) !== 0)
          typedObject.set("destination", this.decodeAMF3());
        if ((flag & 0x08) !== 0) typedObject.set("headers", this.decodeAMF3());
        if ((flag & 0x10) !== 0)
          typedObject.set("messageId", this.decodeAMF3());
        if ((flag & 0x20) !== 0)
          typedObject.set("timeStamp", this.decodeAMF3());
        if ((flag & 0x40) !== 0)
          typedObject.set("timeToLive", this.decodeAMF3());
        bits = 7;
      } else if (i === 1) {
        if ((flag & 0x01) !== 0) {
          typedObject.set(
            "clientId",
            this.convertByteArrayToId(this.decodeAMF3())
          );
        }
        if ((flag & 0x02) !== 0) {
          typedObject.set(
            "messageId",
            this.convertByteArrayToId(this.decodeAMF3())
          );
        }
        bits = 2;
      }
      this.readRemaining(flag, bits);
    }
    const flags2 = this.readFlagData();
    for (let i = 0; i < flags2.length; i++) {
      const flag = flags2[i];
      let bits = 0;
      if (i === 0) {
        if ((flag & 0x01) !== 0)
          typedObject.set("correlationId", this.decodeAMF3());
        if ((flag & 0x02) !== 0) {
          const ignored = this.readByteAsInteger();
          typedObject.set(
            "correlationId",
            this.convertByteArrayToId(Array.from(this.readByteArrayAMF3()))
          );
        }
        bits = 2;
      }
      this.readRemaining(flag, bits);
    }
    return typedObject;
  }

  private readJson(): TypedObject {
    let size = 0;
    for (let i = 0; i < 4; i++) {
      size = size * 256 + this.readByteAsInteger();
    }
    const jsonString = new TextDecoder().decode(this.readBytes(size));
    const jsonObj = JSON.parse(jsonString);
    return TypedObject.fromJson(jsonObj);
  }

  private readObjectAMF3(): Object {
    const type = this.readIntegerAMF3();
    if ((type & 0x01) === 0) {
      return this.getStoredObjectAMF3(type >> 1);
    } else {
      const defineInline = ((type >> 1) & 0x01) !== 0;
      let classDefinition: ClassDefinition;

      if (defineInline) {
        classDefinition = new ClassDefinition();
        classDefinition.externalizable = ((type >> 2) & 1) !== 0;
        classDefinition.encoding = (type >> 2) & 0x03;
        classDefinition.properties = new Array<string>(type >> 4);
        classDefinition.className = this.readUTF8StringAMF3();

        for (let i = 0; i < classDefinition.properties.length; i++) {
          classDefinition.properties[i] = this.readUTF8StringAMF3();
        }

        this.storeClassDefinitionAMF3(classDefinition);
      } else {
        classDefinition = this.getStoredClassDefinitionAMF3(type);
      }

      let typedObject = new TypedObject(classDefinition.className);
      this.storeObjectAMF3(typedObject);

      if (classDefinition.externalizable) {
        switch (classDefinition.className) {
          case "DSK":
            typedObject = this.readDSK();
            break;
          case "DSA":
            typedObject = this.readDSA();
            break;
          case "flex.messaging.io.ArrayCollection":
            typedObject = TypedObject.createArrayCollection(
              this.decodeAMF3() as Object[]
            );
            break;
          case "com.riotgames.platform.systemstate.ClientSystemStatesNotification":
          case "com.riotgames.platform.broadcast.BroadcastNotification":
          case "com.riotgames.platform.summoner.SummonerCatalog":
          case "com.riotgames.platform.game.GameTypeConfigDTO":
            typedObject = this.readJson();
            break;
          default:
            throw new Error(
              `Unhandled Externalizable: ${classDefinition.className}\nRAW:`
            );
        }
      } else {
        for (let i = 0; i < classDefinition.properties.length; i++) {
          typedObject.set(classDefinition.properties[i], this.decodeAMF3());
        }

        if (classDefinition.encoding === 0x02) {
          while (true) {
            const key = this.readUTF8StringAMF3();
            if (key.length === 0) break;
            typedObject.set(key, this.decodeAMF3());
          }
        }
      }

      return typedObject;
    }
  }

  private decodeAMF3(): any {
    const op: number = this.read();
    const type: AMF3Type | undefined = AMF3Type.find(op);

    if (type === undefined) {
      throw new Error(`Unknown AMF3 type: ${op}`);
    }

    let amf3: any;

    switch (type) {
      case AMF3Type.UNDEFINED:
        amf3 = this.readUndefinedAMF3();
        break;
      case AMF3Type.NULL:
        amf3 = this.readNullAMF3();
        break;
      case AMF3Type.BOOLEAN_FALSE:
        amf3 = this.readBooleanFalseAMF3();
        break;
      case AMF3Type.BOOLEAN_TRUE:
        amf3 = this.readBooleanTrueAMF3();
        break;
      case AMF3Type.INTEGER:
        amf3 = this.readIntegerAMF3();
        break;
      case AMF3Type.DOUBLE:
        amf3 = this.readDoubleAMF3();
        break;
      case AMF3Type.STRING:
        amf3 = this.readUTF8StringAMF3();
        break;
      case AMF3Type.XMLDOCUMENT:
        // amf3 = this.readXMLDocumentAMF3(); // Not implemented yet.
        break;
      case AMF3Type.DATE:
        amf3 = this.readDateAMF3();
        break;
      case AMF3Type.ARRAY:
        amf3 = this.readArrayAMF3();
        break;
      case AMF3Type.OBJECT:
        amf3 = this.readObjectAMF3();
        break;
      case AMF3Type.XML:
        // amf3 = this.readXMLAMF3();
        break;
      case AMF3Type.BYTEARRAY:
        amf3 = this.readByteArrayAMF3();
        break;
      case AMF3Type.VECTORINT:
        // amf3 = this.readVectorIntegerAMF3();
        break;
      case AMF3Type.VECTORUNIT:
        // amf3 = this.readVectorUnitAMF3();
        break;
      case AMF3Type.VECTORDOUBLE:
        // amf3 = this.readVectorDoubleAMF3();
        break;
      case AMF3Type.VECTOROBJECT:
        // amf3 = this.readVectorObjectAMF3();
        break;
      case AMF3Type.DICTIONARY:
        // amf3 = this.readDictionaryAMF3();
        break;
      default:
        throw new Error(`Unknown AMF3 type: ${op}`);
    }

    return amf3;
  }

  private decodeAMF0(): any {
    const op: number = this.read();
    const type: AMF0Type | undefined = AMF0Type.find(op);

    if (type === undefined) {
      throw new Error("Unknown AMF0 type: " + op);
    }

    let amf0: any;
    switch (type) {
      case AMF0Type.NUMBER:
        amf0 = this.readNumberAMF0();
        break;
      case AMF0Type.BOOLEAN:
        amf0 = this.readBooleanAMF0();
        break;
      case AMF0Type.STRING:
        amf0 = this.readUTF8StringAMF0();
        break;
      case AMF0Type.OBJECT:
        amf0 = this.readObjectAMF0();
        break;
      case AMF0Type.MOVIECLIP:
        // amf0 = this.readMovieClipAMF0(); // Not implemented yet.
        break;
      case AMF0Type.NULL:
        amf0 = this.readNullAMF0();
        break;
      case AMF0Type.UNDEFINED:
        // amf0 = this.readUndefinedAMF0(); // Not implemented yet.
        break;
      case AMF0Type.REFERENCE:
        amf0 = this.readTypeReferenceAMF0();
        break;
      case AMF0Type.MIXEDARRAY:
        // amf0 = this.readMixedArrayAMF0(); // Not implemented yet.
        break;
      case AMF0Type.OBJECTTERM:
        amf0 = this.readObjectTermAMF0();
        break;
      case AMF0Type.ARRAY:
        amf0 = this.readArrayAMF0();
        break;
      case AMF0Type.DATE:
        amf0 = this.readDateAMF0();
        break;
      case AMF0Type.LONGSTRONG:
        // amf0 = this.readLongStringAMF0(); // Not implemented yet.
        break;
      case AMF0Type.UNSUPPORTED:
        // amf0 = this.readUnsupportedAMF0(); // Not implemented yet.
        break;
      case AMF0Type.RECORDSET:
        // amf0 = this.readRecordSetAMF0(); // Not implemented yet.
        break;
      case AMF0Type.XML:
        // amf0 = this.readXMLAMF0(); // Not implemented yet.
        break;
      case AMF0Type.TYPEDOBJECT:
        amf0 = this.readTypedObjectAMF0();
        break;
      case AMF0Type.AMF3:
        amf0 = this.decodeAMF3();
        break;
      default:
        throw new Error("Unknown AMF0 type: " + op);
    }

    return amf0;
  }

  public decode(b: Buffer, typedObject: TypedObject): TypedObject {
    this.resetBuffer();
    this.resetAMF0();
    this.data = b;
    if (this.data[0] == 0x00) {
      this.position++;
      typedObject.set("version", 0x00);
    }
    typedObject.set("result", this.decodeAMF0());
    typedObject.set("invokeId", this.decodeAMF0());
    typedObject.set("serviceCall", this.decodeAMF0());
    typedObject.set("data", this.decodeAMF0());
    if (this.position != this.data.length) {
      throw new Error(
        "The buffer has not been fully consumed: " +
          this.position +
          " of " +
          this.data.length +
          "\nRAW: " +
          b.toString("hex")
      );
    }
    return typedObject;
  }

  private resetBuffer(): void {
    this.data = Buffer.alloc(0);
    this.position = 0;
  }
}

class ClassDefinition {
  externalizable: boolean;
  encoding: number;
  properties: string[];
  className: string;

  constructor() {
    this.externalizable = false;
    this.encoding = 0;
    this.properties = [];
    this.className = "";
  }
}

class ObjectTerminateAMF0 {
  public static INSTANCE = new ObjectTerminateAMF0();
  public static internal = AMF0Type.OBJECTTERM;

  public toString(): string {
    return `ObjectTerminate{internal=${ObjectTerminateAMF0.internal}}`;
  }
}

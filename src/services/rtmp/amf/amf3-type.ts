export enum AMF3Type {
  UNDEFINED = 0x00,
  NULL = 0x01,
  BOOLEAN_FALSE = 0x02,
  BOOLEAN_TRUE = 0x03,
  INTEGER = 0x04,
  DOUBLE = 0x05,
  STRING = 0x06,
  XMLDOCUMENT = 0x07,
  DATE = 0x08,
  ARRAY = 0x09,
  OBJECT = 0x0a,
  XML = 0x0b,
  BYTEARRAY = 0x0c,
  VECTORINT = 0x0d,
  VECTORUNIT = 0x0e,
  VECTORDOUBLE = 0x0f,
  VECTOROBJECT = 0x10,
  DICTIONARY = 0x11,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AMF3Type {
  export function find(value: number): AMF3Type | undefined {
    return Object.values(AMF3Type).find((v) => typeof v === "number" && v === value) as AMF3Type | undefined;
  }
}

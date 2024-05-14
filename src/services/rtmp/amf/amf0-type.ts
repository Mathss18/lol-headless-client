export enum AMF0Type {
  NUMBER = 0x00,
  BOOLEAN = 0x01,
  STRING = 0x02,
  OBJECT = 0x03,
  MOVIECLIP = 0x04,
  NULL = 0x05,
  UNDEFINED = 0x06,
  REFERENCE = 0x07,
  MIXEDARRAY = 0x08,
  OBJECTTERM = 0x09,
  ARRAY = 0x0a,
  DATE = 0x0b,
  LONGSTRONG = 0x0c,
  UNSUPPORTED = 0x0d,
  RECORDSET = 0x0e,
  XML = 0x0f,
  TYPEDOBJECT = 0x10,
  AMF3 = 0x11,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AMF0Type {
  export function find(value: number): AMF0Type | undefined {
    return Object.values(AMF0Type).find((v) => typeof v === "number" && v === value) as AMF0Type | undefined;
  }
}

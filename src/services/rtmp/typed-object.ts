class TypedObject extends Map<string, unknown> {
  private type: string | null;

  constructor(type?: string) {
    super();
    this.type = type || null;
  }

  setType(type: string): void {
    this.type = type;
  }

  getType(): string | null {
    return this.type;
  }

  getInteger(key: string): number | null {
    const value = this.get(key);
    return value === undefined ? null : Number(value);
  }

  getLong(key: string): number | null {
    const value = this.get(key);
    return value === undefined ? null : Number(value);
  }

  getString(key: string): string | null {
    const value = this.get(key);
    return value === undefined ? null : String(value);
  }

  getTypedObject(key: string): TypedObject | null {
    const value = this.get(key);
    return value instanceof TypedObject ? value : null;
  }

  toString(): string {
    const entries = Array.from(this.entries())
      .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
      .join(", ");

    const typeString = this.type ? `"type": "${this.type}", ` : "";
    return `{ ${typeString}${entries} }`;
  }

  static createArrayCollection(arr: unknown[]): TypedObject {
    const typedObject = new TypedObject("flex.messaging.io.ArrayCollection");
    typedObject.set("array", arr);
    return typedObject;
  }

  static fromJson(json: Record<string, unknown>): TypedObject {
    const typedObject = new TypedObject();
    for (const key in json) {
      typedObject.set(key, TypedObject.convert(json[key]));
    }
    return typedObject;
  }

  private static convert(value: unknown): unknown {
    if (value instanceof Object && !(value instanceof Array)) {
      return TypedObject.fromJson(value as Record<string, unknown>);
    } else if (value instanceof Array) {
      return value.map(TypedObject.convert);
    }
    return value;
  }
}

export default TypedObject;

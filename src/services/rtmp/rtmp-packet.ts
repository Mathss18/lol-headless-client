export class RtmpPacket {
  private initialHeader: number;
  private messageType: number;
  private headerPosition: number;
  private headerSize: number;
  private bodyPosition: number;
  private bodySize: number;
  private header: Buffer;
  private body: Buffer;

  constructor(initialHeader: number) {
    this.initialHeader = initialHeader;
    this.headerPosition = 0; // Initialize headerPosition
    this.bodyPosition = 0;   // Initialize bodyPosition

  }

  public setMessageType(messageType: number): void {
    this.messageType = messageType;
  }

  public setHeaderSize(headerSize: number): void {
    this.header = Buffer.alloc(headerSize);
    this.headerSize = headerSize;
  }

  public addToHeader(b: number): void {
    this.header[this.headerPosition++] = b;
  }

  public setBodySize(bodySize: number): void {
    this.body = Buffer.alloc(bodySize);
    this.bodySize = bodySize;
  }

  public addToBody(b: number): void {
    this.body[this.bodyPosition++] = b;
  }

  public getInitialHeader(): number {
    return this.initialHeader;
  }

  public getMessageType(): number {
    return this.messageType;
  }

  public getHeaderPosition(): number {
    return this.headerPosition;
  }

  public getHeaderSize(): number {
    return this.headerSize;
  }

  public getBodyPosition(): number {
    return this.bodyPosition;
  }

  public getBodySize(): number {
    return this.bodySize;
  }

  public getHeader(): Buffer {
    return this.header;
  }

  public getBody(): Buffer {
    return this.body;
  }

  public isComplete(): boolean {
    return this.headerSize === this.headerPosition && this.bodySize === this.bodyPosition;
  }

  public toString(): string {
    return `RtmpPacket{complete=${this.isComplete()}, initialHeader=${this.initialHeader}, headerPosition=${this.headerPosition}, headerSize=${this.headerSize}, bodyPosition=${this.bodyPosition}, bodySize=${this.bodySize}}`;
  }
}

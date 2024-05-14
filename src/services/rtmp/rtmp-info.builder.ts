export type PropertyMap = { [key: string]: any };

export class RtmpConnectInfo {
  private readonly map: PropertyMap;

  constructor(map: PropertyMap) {
    this.map = map;
  }

  public getValue(property: string): any {
    return this.map[property];
  }

  public getMap(): PropertyMap {
    return this.map;
  }
}

export class RtmoInfoBuilder {
  private readonly properties: PropertyMap = {};

  constructor() {}

  replicate(): RtmoInfoBuilder {
    const builder = new RtmoInfoBuilder();
    const list = Object.entries(this.properties);
    for (const [key, value] of list) {
      builder.set(key, value);
    }
    return builder;
  }

  set(property: string, value: any): RtmoInfoBuilder {
    this.properties[property] = value;
    return this;
  }

  setApp(value: any): RtmoInfoBuilder {
    return this.set("app", value);
  }

  setFlashVersion(value: any): RtmoInfoBuilder {
    return this.set("flashVer", value);
  }

  setSwfURL(value: any): RtmoInfoBuilder {
    return this.set("swfUrl", value);
  }

  setTcURL(value: any): RtmoInfoBuilder {
    return this.set("tcUrl", value);
  }

  setFPAD(value: any): RtmoInfoBuilder {
    return this.set("fpad", value);
  }

  setCapabilities(value: any): RtmoInfoBuilder {
    return this.set("capabilities", value);
  }

  setAudioCodecs(value: any): RtmoInfoBuilder {
    return this.set("audioCodecs", value);
  }

  setVideoCodecs(value: any): RtmoInfoBuilder {
    return this.set("videoCodecs", value);
  }

  setVideoFunction(value: any): RtmoInfoBuilder {
    return this.set("objectEncoding", value);
  }

  setPageURL(value: any): RtmoInfoBuilder {
    return this.set("pageUrl", value);
  }

  setObjectEncoding(value: any): RtmoInfoBuilder {
    return this.set("objectEncoding", value);
  }

  build(): RtmpConnectInfo {
    return new RtmpConnectInfo(this.properties);
  }
}

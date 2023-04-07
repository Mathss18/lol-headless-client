export class Platform {
  static readonly RU = new Platform("RU");
  static readonly EUW1 = new Platform("EUW");
  static readonly JP1 = new Platform("JP");
  static readonly EUN1 = new Platform("EUNE");
  static readonly KR = new Platform("KR");
  static readonly TW2 = new Platform("TW2");
  static readonly BR1 = new Platform("BR");
  static readonly NA1 = new Platform("NA");
  static readonly PH2 = new Platform("PH2");
  static readonly VN2 = new Platform("VN2");
  static readonly LA2 = new Platform("LA2");
  static readonly OC1 = new Platform("OC1");
  static readonly LA1 = new Platform("LA1");
  static readonly TR1 = new Platform("TR");
  static readonly SG2 = new Platform("SG2");
  static readonly TH2 = new Platform("TH2");

  private constructor(readonly friendlyName: string) {}

  private static readonly _values = [
    Platform.RU,
    Platform.EUW1,
    Platform.JP1,
    Platform.EUN1,
    Platform.KR,
    Platform.TW2,
    Platform.BR1,
    Platform.NA1,
    Platform.PH2,
    Platform.VN2,
    Platform.LA2,
    Platform.OC1,
    Platform.LA1,
    Platform.TR1,
    Platform.SG2,
    Platform.TH2,
  ];

  public static get values(): Platform[] {
    return this._values;
  }

  public static findByFriendlyName(name: string): Platform | null {
    return (
      this.values.find(
        (platform) => platform.friendlyName.toLowerCase() === name.toLowerCase()
      ) || null
    );
  }
}

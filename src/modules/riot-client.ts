export class RiotClientUser {
  private sub: string;
  private _dataRegion: string | null;
  private _dataUserId: number;

  constructor(jwt: string) {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedJwt = JSON.parse(atob(base64));

    this.sub = decodedJwt.sub;

    const data = decodedJwt.dat;
    this._dataUserId = data.hasOwnProperty("u") ? data.u : 0;
    this._dataRegion = data.hasOwnProperty("r") ? data.r : null;
  }

  getSub(): string {
    return this.sub;
  }

  get dataRegion(): string | null {
    return this._dataRegion;
  }

  get dataUserId(): number {
    return this._dataUserId;
  }

  isLeagueAccountAssociated(): boolean {
    return this._dataUserId !== 0 && this.dataRegion !== null;
  }

  toString(): string {
    return `RiotClientUser{sub='${this.sub}', dataRegion='${this.dataRegion}', dataUserId=${this.dataUserId}}`;
  }
}

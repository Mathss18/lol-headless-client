import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { REGION } from "../config/regions";

export interface UserData {
  sub: string;
  profileIconId: number;
  level: number;
  shardId: string;
  privacy: string;
  expToNextLevel: number;
  unnamed: false;
  nameChangeFlag: false;
  accountId: number;
  name: string;
  expPoints: number;
  id: number;
  exp: number;
  iat: number;
}
export class UserDataSupplier {
  readonly URL = `${REGION.leagueEdgeUrl}/summoner-ledge/v1/regions/${REGION.regionUpper}/summoners/puuid`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "GET" }): Promise<UserData> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/jwt`,
      method: method,
      headers: this.headers,
    });
    const tokenParts = response.data.split(".");
    const decodedPayload = Buffer.from(tokenParts[1], "base64").toString(
      "utf8"
    );
    const payload = JSON.parse(decodedPayload);
    return payload;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-summoner)`,
    };

    return headers;
  }
}

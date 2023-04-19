import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";

export class PartyUserTokenSupplier {
  readonly URL = "https://br-red.lol.sgp.pvp.net/summoner-ledge/v1/regions/BR1/summoners/puuid";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "GET" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/jwt`,
      method: method,
      headers: this.headers,
      body: {},
    });
    return response;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-summoner)`,
    };

    return headers;
  }
}

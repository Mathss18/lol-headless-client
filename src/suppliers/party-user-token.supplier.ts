import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { REGION } from "../config/regions";

export class PartyUserTokenSupplier {
  readonly URL = `${REGION.leagueEdgeUrl}/summoner-ledge/v1/regions/${REGION.regionLower}/summoners/puuid`;

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

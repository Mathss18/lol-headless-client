import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class UnregisterSupplier {
  readonly URL = `${
    getRegion(this.region).leagueEdgeUrl
  }/parties-ledge/v1/players`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
    private region: Region,
    private clientVersion: string
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "POST" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/unregister`,
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
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`,
    };

    return headers;
  }
}

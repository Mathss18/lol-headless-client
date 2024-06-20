import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class JoinLobbySupplier {
  readonly URL = `${
    getRegion(this.region).leagueEdgeUrl
  }/parties-ledge/v1/parties`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private partyId: string,
    private puuid: string,
    private region: Region,
    private clientVersion: string
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "PUT" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/members/${this.puuid}/role`,
      method: method,
      headers: this.headers,
      body: "MEMBER",
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

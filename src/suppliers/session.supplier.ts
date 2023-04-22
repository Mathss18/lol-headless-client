import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { REGION } from "../config/regions";

export class SessionSupplier {
  readonly URL = `${REGION.playerPlatformEdgeUrl}/session-external/v1/session/create`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "POST" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: this.URL,
      method: method,
      headers: this.headers,
      body: this.body,
    });
    return response;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-login)`,
    };

    return headers;
  }

  public get body() {
    const body = {
      product: "lol",
      claims: { cname: "lcu" },
      puuid: this.puuid,
      region: REGION.regionLower,
    };

    return body;
  }
}

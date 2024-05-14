import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class SessionRefreshSupplier {
  readonly URL = `${getRegion(this.region).playerPlatformEdgeUrl}/session-external/v1/session/refresh`;

  constructor(private apiRequest: ApiRequest, private jwt: string, private region: Region) {
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
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-league-session)`,
    };

    return headers;
  }

  public get body() {
    const body = { lst: this.jwt };

    return body;
  }
}

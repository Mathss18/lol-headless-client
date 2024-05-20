import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class QueueSupplier {
  readonly URL = `${getRegion(this.region).playerPlatformEdgeUrl}/login-queue/v2/login/products/lol/regions/${
    getRegion(this.region).regionLower
  }`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private entitlementJwt: string,
    private userInfoJwt: string,
    private region: Region,
    private clientVersion: string,
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
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-login)`,
    };

    return headers;
  }

  public get body() {
    const body = {
      clientName: "lcu",
      entitlements: this.entitlementJwt,
      userinfo: this.userInfoJwt,
    };

    return body;
  }
}

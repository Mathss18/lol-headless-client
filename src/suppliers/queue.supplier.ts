import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "../helpers/version.helper";

export class QueueSupplier {
  readonly URL = "https://usw2-green.pp.sgp.pvp.net/login-queue/v2/login/products/lol/regions/br1";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private entitlementJwt: string,
    private userInfoJwt: string
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
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.versionQueue} (rcp-be-lol-login)`,
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

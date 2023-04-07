import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "./version.supplier";

export class SessionSupplier {
  readonly URL =
    "https://usw2-green.pp.sgp.pvp.net/session-external/v1/session/create";

  constructor(private apiRequest: ApiRequest, private jwt: string) {
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
      product: "lol",
      claims: { cname: "lcu" },
      puuid: "d100ae6c-06a9-5aae-a535-f687de6d5d52",
      region: "br1",
    };

    return body;
  }
}

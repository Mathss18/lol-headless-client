import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";

export class UnregisterSupplier {
  readonly URL = "https://br-red.lol.sgp.pvp.net/parties-ledge/v1/players";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
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
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-lobby)`,
    };

    return headers;
  }
}
import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class SiptSupplier {
  readonly URL = `${getRegion(this.region).leagueEdgeUrl}/sipt/v1/sipt/token`;

  constructor(private apiRequest: ApiRequest, private jwt: string, private region: Region) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "GET" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: this.URL,
      method: method,
      headers: this.headers,
    });
    return response;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-login)`,
    };

    return headers;
  }
}

import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class PartyTypeSupplier {
  readonly URL = `${
    getRegion(this.region).leagueEdgeUrl
  }/parties-ledge/v1/parties`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private partyId: string,
    private type: "open" | "closed",
    private region: Region,
    private clientVersion: string,
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "PUT" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}`,
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
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`,
    };

    return headers;
  }

  public get body() {
    const body = this.type;
    return body;
  }
}

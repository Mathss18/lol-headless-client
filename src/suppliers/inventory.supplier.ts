import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { REGION } from "../config/regions";

export class InventorySupplier {
  readonly URL =
    `${REGION.leagueEdgeUrl}/lolinventoryservice-ledge/v1/inventories/simple?inventoryTypes=CHAMPION&inventoryTypes=CHAMPION_SKIN`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
    private accountId: number
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "GET" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: this.URL,
      method: method,
      headers: this.headers,
      params: this.params as any,
    });
    return response;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-inventory)`,
    };

    return headers;
  }

  public get params() {
    const params = {
      puuid: `${this.puuid}`,
      location: REGION.discoverousServiceLocation,
      accountId: `${this.accountId}`,
      // inventoryTypes: ["CHAMPION", "CHAMPION_SKIN"],
      // includef2p: "true",
    };

    return params;
  }
}

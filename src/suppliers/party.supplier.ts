import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "../helpers/version.helper";

export class PartySupplier {
  readonly URL = "https://br-red.lol.sgp.pvp.net/parties-ledge/v1/players";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
    private accountId: number,
    private id: number
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "PUT" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}`,
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
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.versionQueue} (rcp-be-lol-lobby)`,
    };

    return headers;
  }

  public get body() {
    const body = {
      accountId: this.accountId,
      platformId: "BR1",
      puuid: this.puuid,
      registration: {
        gameClientVersion: VersionSupplier.gameVersion,
        inventoryToken: null,
      },
      summonerId: this.id,
    };
    return body;
  }
}

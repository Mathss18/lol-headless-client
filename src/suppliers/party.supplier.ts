import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { REGION } from "../config/regions";

export class PartySupplier {
  readonly URL = `${REGION.leagueEdgeUrl}/parties-ledge/v1/players`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private puuid: string,
    private accountId: number,
    private id: number,
    private inventoryToken: string,
    private partyUserToken: string
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
      "User-Agent": `LeagueOfLegendsClient/${VersionSupplier.clientVersion} (rcp-be-lol-lobby)`,
    };

    return headers;
  }

  public get body() {
    const body = {
      accountId: this.accountId,
      createdAt: 0,
      currentParty: null,
      eligibilityHash: 0,
      parties: null,
      platformId: REGION.regionUpper,
      puuid: this.puuid,
      registration: {
        gameClientVersion: VersionSupplier.gameVersion,
        inventoryToken: null,
        inventoryTokens: [""],
        playerTokens: {
          idToken: "",
        },
        rankedOverviewToken: "",
        simpleInventoryToken: this.inventoryToken,
        summonerToken: this.partyUserToken,
      },
      serverUtcMillis: 0,
      summonerId: this.id,
      version: 0,
    };
    return body;
  }
}

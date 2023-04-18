import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { players } from "../placeholders/accept-match";

export class AcceptMatchSupplier {
  readonly URL =
    "https://br-red.lol.sgp.pvp.net/team-builder-ledge/v2/indicateAfkReadiness";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private accountId: number,
    private summonerId: number,
    private inventoryToken: string
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "POST" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/accountId/${this.accountId}/summonerId/${this.summonerId}`,
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
      additionalInventoryJwt: "",
      afkReady: true,
      initialSpellIds: [6, 7],
      lastSelectedSkinIdByChampionId: {},
      simplifiedInventoryJwt: this.inventoryToken
    };

    return body;
  }
}

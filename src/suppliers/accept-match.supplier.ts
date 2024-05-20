import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { SummonerSpell } from "../enums/summoner-spell.enum";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class AcceptMatchSupplier {
  readonly URL = `${getRegion(this.region).leagueEdgeUrl}/team-builder-ledge/v2/indicateAfkReadiness`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private accountId: number,
    private summonerId: number,
    private inventoryToken: string,
    private summonerSpells: SummonerSpell[],
    private region: Region,
    private clientVersion: string,
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
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`,
    };

    return headers;
  }

  public get body() {
    const body = {
      additionalInventoryJwt: "",
      afkReady: true,
      initialSpellIds: this.summonerSpells,
      lastSelectedSkinIdByChampionId: {},
      simplifiedInventoryJwt: this.inventoryToken,
    };

    return body;
  }
}

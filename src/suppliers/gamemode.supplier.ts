import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { Gamemode } from "src/enums/gamemode.enum";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class GamemodeSupplier {
  readonly URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/parties`;

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private partyId: string,
    private gamemode: Gamemode,
    private region: Region,
    private clientVersion: string,
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "PUT" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/gamemode`,
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
      allowSpectators: null,
      botDifficulty: null,
      customsSettings: null,
      gameCustomization: {},
      gameType: "",
      gameTypeConfigId: null,
      mapId: null,
      maxPartySize: 5,
      maxTeamSize: 0,
      queueId: this.gamemode,
    };
    return body;
  }
}

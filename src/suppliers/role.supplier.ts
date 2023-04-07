import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { Role } from "src/enums/role.enum";

export class RoleSupplier {
  readonly URL = "https://br-red.lol.sgp.pvp.net/parties-ledge/v1/parties";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private partyId: string,
    private puuid: string,
    private roles: Role[]
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "PUT" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/members/${this.puuid}/metadata`,
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
      championSelection: null,
      playerSlots: [],
      positionPref: this.roles,
      properties: null,
      skinSelection: null,
    };
    return body;
  }
}

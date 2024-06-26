import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionHelper } from "../helpers/version.helper";

export class EntitlementSupplier {
  readonly URL = "https://entitlements.auth.riotgames.com/api/token/v1";

  constructor(private apiRequest: ApiRequest, private jwt: string) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "POST" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: this.URL,
      method: method,
      headers: this.headers,
      body: JSON.stringify({ urn: "urn:entitlement:%" }),
    });
    return response;
  }

  public get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `RiotGamesApi/${VersionHelper.versionDll} entitlements (Windows;10;;Home Single Language, x64) riot_client/0`,
    };

    return headers;
  }
}

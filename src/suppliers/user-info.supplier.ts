import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { VersionHelper } from "../helpers/version.helper";

export class UserInfoSupplier {
  readonly URL = "https://auth.riotgames.com/userinfo";

  constructor(private apiRequest: ApiRequest, private jwt: string) {
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
      "User-Agent": `RiotClient/${VersionHelper.version} rso-auth (Windows;10;;Professional, x64)`,
    };

    return headers;
  }
}

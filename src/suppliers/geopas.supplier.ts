import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";

export class GeopasSupplier {
  readonly URL =
    "https://riot-geo.pas.si.riotgames.com/pas/v1/service/chat";

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
    };

    return headers;
  }
}

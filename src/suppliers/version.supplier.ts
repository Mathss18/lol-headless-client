import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/http/api-request";
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";

export class VersionSupplier {
  readonly URL = `https://sieve.services.riotcdn.net/api/v1/products/lol/version-sets/${
    getRegion(this.region).regionUpper
  }?q[platform]=windows&q[artifact_type_id]=lol-game-client&q[published]=true`;

  constructor(
    private apiRequest: ApiRequest,
    private region: Region
  ) {
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
      Accept: "application/json",
    };

    return headers;
  }
}

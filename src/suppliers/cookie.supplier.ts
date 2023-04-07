import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "../helpers/version.helper";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { AxiosResponse } from "axios";

export class CookieSupplier {
  readonly URL = "https://auth.riotgames.com/api/v1/authorization";
  private _additionalCookie?: string | null = null;
  private _body?: object;
  private _cookieType: "CLIENT" | "LOL" = "CLIENT";

  constructor(
    private apiRequest: ApiRequest,
    cookieType: "CLIENT" | "LOL" = "CLIENT"
  ) {
    this.apiRequest = apiRequest;
    this._cookieType = cookieType;
  }

  public async makeRequest({
    method = "POST",
    body = this.body,
  }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: this.URL,
      method: method,
      headers: this.headers,
      body: body,
    });
    return response;
  }

  public get headers() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Pragma: "no-cache",
      "User-Agent": `RiotClient/${VersionSupplier.version} rso-auth (Windows;10;;Professional, x64)`,
    };
    if (this._additionalCookie) {
      headers["Cookie"] = this._additionalCookie;
    }
    return headers;
  }

  public get body() {
    return JSON.stringify({
      acr_values: "",
      claims: "",
      response_type: "token id_token",
      code_challenge_method: "",
      redirect_uri: "http://localhost/redirect",
      nonce: this.generateNonce(),
      code_challenge: "",
      client_id: this.cookieType === "CLIENT" ? "riot-client" : "lol",
      scope:
        this.cookieType === "CLIENT"
          ? "openid link ban lol_region lol summoner offline_access"
          : "lol_region account openid ban lol summoner offline_access",
    });
  }

  public set additionalCookie(value: string | null) {
    this._additionalCookie = value;
  }

  public set cookieType(value: "CLIENT" | "LOL") {
    this._cookieType = value;
  }

  private generateNonce() {
    return base64url.encode(uuidv4(), "utf8").substring(0, 22);
  }

  public build(arr: string[]) {
    if (arr == null || arr.length === 0) return null;

    const builder = [];
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i].split(";");
      builder.push(data[0].trim());
    }

    const result = builder.join("; ") + ";";
    return result;
  }

  public getCfbm(arr: string[]): string {
    const cfBmElement = arr.find((str) => str.startsWith("__cf_bm"));
    if (!cfBmElement) {
      console.debug("[CFBM COOKIE] Not found");
      return "";
    }
    const cfBmString = cfBmElement.slice(
      cfBmElement.indexOf("__cf_bm"),
      cfBmElement.indexOf(";", cfBmElement.indexOf("__cf_bm"))
    );

    return cfBmString;
  }
}

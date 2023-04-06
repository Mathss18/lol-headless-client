import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as https from "https";

interface IRequestParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

export class Request {
  private ciphers: string;
  private agent: https.Agent;

  constructor(
    private userAgent = "RiotClient/63.0.9.4909983.4789131 %s (Windows;10;;Professional, x64)"
  ) {
    this.ciphers =
      "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384";

    const agentOptions: https.AgentOptions = {
      ciphers: this.ciphers,
      maxVersion: "TLSv1.3",
      minVersion: "TLSv1.2",
    };

    this.agent = new https.Agent(agentOptions);
  }

  async request({
    url,
    method = "GET",
    headers = {},
    body,
  }: IRequestParams): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        headers: { ...headers, "User-Agent": this.userAgent },
        data: body,
        httpsAgent: this.agent,
      };

      const response: AxiosResponse = await axios(config);

      return response;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}

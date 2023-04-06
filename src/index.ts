import { Request } from "./services/request";
// Usage example
(async () => {
  try {
    const riotAuth = new Request();

    const url = "https://auth.riotgames.com/api/v1/authorization";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "RiotClient/63.0.9.4909983.4789131 rso-auth (Windows;10;;Professional, x64)",
    };
    const body = JSON.stringify({
      acr_values: "",
      scope: "openid link ban lol_region lol summoner offline_access",
      claims: "",
      response_type: "token id_token",
      code_challenge_method: "",
      redirect_uri: "http://localhost/redirect",
      nonce: "39u4TNdFI1LJeQEkR9Yddw",
      code_challenge: "",
      client_id: "riot-client",
    });

    const response = await riotAuth.request({
      url,
      method: "POST",
      headers,
      body,
    });
    console.log(response.headers);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
})();

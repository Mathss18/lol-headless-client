import { Platform } from "./helpers/platform.helper";
import { CookieSupplier } from "./modules/cookie.supplier";
import { EntitlementSupplier } from "./modules/entitlement.supplier";
import { GeopasSupplier } from "./modules/geopas.supplier";
import { QueryTokenParser } from "./modules/query-token.parser";
import { QueueSupplier } from "./modules/queue.supplier";
import { RiotClientUser } from "./modules/riot-client";
import { SessionRefreshSupplier } from "./modules/session-refresh.supplier";
import { SessionSupplier } from "./modules/session.supplier";
import { UserInfo } from "./modules/user.info";
import { ApiRequest } from "./services/api-request";

class Main {
  async start() {
    try {
      const apiRequest = new ApiRequest();
      const cookieSupplier = new CookieSupplier(apiRequest);

      const { headers: h1 } = await cookieSupplier.makeRequest({});

      cookieSupplier.additionalCookie = cookieSupplier.getCfbm(
        h1["set-cookie"]
      );
      const { headers: h2 } = await cookieSupplier.makeRequest({});

      cookieSupplier.additionalCookie = cookieSupplier.build(h2["set-cookie"]);
      const newBody = JSON.stringify({
        username: "LannyDH",
        password: "88121747m",
        remember: false,
        language: "en_GB",
        type: "auth",
        region: null,
      });
      const { data } = await cookieSupplier.makeRequest({
        method: "PUT",
        body: newBody,
      });
      const parsedTokens1 = QueryTokenParser.parse(
        data.response.parameters.uri
      );
      const riotClientUser = new RiotClientUser(parsedTokens1["access_token"]);

      // const platform = Platform.findByFriendlyName(riotClientUser.dataRegion);
      // ALL THE REST OF METHODS GOES HERE

      cookieSupplier.additionalCookie = null;
      cookieSupplier.cookieType = "LOL";
      const { headers: h3 } = await cookieSupplier.makeRequest({});

      cookieSupplier.additionalCookie = cookieSupplier.getCfbm(
        h3["set-cookie"]
      );
      const { headers: h4 } = await cookieSupplier.makeRequest({});

      cookieSupplier.additionalCookie = cookieSupplier.build(h4["set-cookie"]);
      const newBody2 = JSON.stringify({
        username: "LannyDH",
        password: "88121747m",
        remember: false,
        language: "en_GB",
        type: "auth",
        region: null,
      });
      const { data: data2 } = await cookieSupplier.makeRequest({
        method: "PUT",
        body: newBody2,
      });

      const parsedTokens2 = QueryTokenParser.parse(
        data2.response.parameters.uri
      );
      const riotClientUser2 = new RiotClientUser(parsedTokens2["access_token"]);

      const userInfo1 = new UserInfo(apiRequest, parsedTokens1["access_token"]);
      const { data: userInfoData1 } = await userInfo1.makeRequest({});

      const userInfo2 = new UserInfo(apiRequest, parsedTokens2["access_token"]);
      const { data: userInfoData2 } = await userInfo2.makeRequest({});

      const entitlements1 = new EntitlementSupplier(
        apiRequest,
        parsedTokens2["access_token"]
      );
      const { data: dataEntimentals1 } = await entitlements1.makeRequest({}); // LOL
      // console.log(dataEntimentals1.entitlements_token);

      const entitlements2 = new EntitlementSupplier(
        apiRequest,
        parsedTokens1["access_token"]
      );
      const { data: dataEntimentals2 } = await entitlements2.makeRequest({}); // CLIENT
      // console.log(dataEntimentals2.entitlements_token);

      const queue1 = new QueueSupplier(
        apiRequest,
        parsedTokens2["access_token"],
        dataEntimentals1.entitlements_token,
        userInfoData2
      );

      const { data: dataQueue1 } = await queue1.makeRequest({}); // LOL


      const session1 = new SessionSupplier(apiRequest, dataQueue1.token);
      const { data: dataSession1 } = await session1.makeRequest({}); // LOL

      const geopas1 = new GeopasSupplier(apiRequest, parsedTokens2["access_token"]);
      const { data: dataGeopas1 } = await geopas1.makeRequest({}); // LOL
      

      const sessionRefresh1 = new SessionRefreshSupplier(apiRequest, dataSession1);
      const { data: dataSessionRefresh1 } = await sessionRefresh1.makeRequest({}); // LOL
      console.log(dataSessionRefresh1);

    } catch (error) {
      console.log(error);
    }
  }
}

const main = new Main();
main.start();

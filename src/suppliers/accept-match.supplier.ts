import { AxiosResponse } from "axios";
import { ApiRequest } from "src/services/api-request";
import { VersionSupplier } from "../helpers/version.helper";

export class AcceptMatchSupplier {
  readonly URL =
    "https://br-red.lol.sgp.pvp.net/team-builder-ledge/v2/indicateAfkReadiness";

  constructor(
    private apiRequest: ApiRequest,
    private jwt: string,
    private accountId: number,
    private summonerId: number
  ) {
    this.apiRequest = apiRequest;
  }

  public async makeRequest({ method = "POST" }): Promise<AxiosResponse> {
    const response = await this.apiRequest.request({
      url: `${this.URL}/accountId/${this.accountId}/summonerId/${this.summonerId}`,
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
      additionalInventoryJwt: "",
      afkReady: true,
      initialSpellIds: [4, 6],
      lastSelectedSkinIdByChampionId: {
        "1": 1000,
        "10": 10000,
        "101": 101001,
        "102": 102001,
        "103": 103007,
        "104": 104003,
        "105": 105010,
        "106": 106006,
        "107": 107002,
        "11": 11000,
        "110": 110004,
        "112": 112000,
        "113": 113005,
        "114": 114000,
        "115": 115004,
        "119": 119000,
        "120": 120000,
        "121": 121000,
        "122": 122016,
        "126": 126003,
        "127": 127000,
        "13": 13006,
        "131": 131011,
        "133": 133000,
        "134": 134004,
        "136": 136000,
        "14": 14014,
        "141": 141000,
        "142": 142000,
        "145": 145000,
        "15": 15000,
        "150": 150003,
        "157": 157035,
        "16": 16006,
        "163": 163000,
        "164": 164000,
        "17": 17004,
        "18": 18000,
        "19": 19000,
        "2": 2000,
        "20": 20002,
        "201": 201024,
        "202": 202000,
        "203": 203000,
        "22": 22000,
        "222": 222003,
        "223": 223000,
        "23": 23000,
        "235": 235000,
        "236": 236025,
        "238": 238010,
        "24": 24014,
        "240": 240000,
        "245": 245000,
        "25": 25009,
        "254": 254000,
        "266": 266007,
        "268": 268003,
        "27": 27009,
        "28": 28000,
        "29": 29000,
        "3": 3000,
        "30": 30005,
        "31": 31000,
        "32": 32013,
        "33": 33016,
        "34": 34008,
        "35": 35000,
        "350": 350000,
        "36": 36000,
        "360": 360000,
        "37": 37002,
        "38": 38000,
        "39": 39018,
        "4": 4000,
        "40": 40001,
        "41": 41000,
        "412": 412002,
        "42": 42008,
        "421": 421000,
        "427": 427000,
        "429": 429002,
        "43": 43006,
        "45": 45001,
        "48": 48004,
        "498": 498004,
        "51": 51010,
        "517": 517001,
        "523": 523000,
        "53": 53004,
        "54": 54023,
        "55": 55021,
        "555": 555009,
        "56": 56000,
        "57": 57000,
        "58": 58000,
        "59": 59008,
        "6": 6000,
        "60": 60000,
        "61": 61005,
        "62": 62006,
        "64": 64012,
        "67": 67005,
        "68": 68003,
        "69": 69000,
        "7": 7000,
        "72": 72000,
        "74": 74000,
        "75": 75009,
        "76": 76011,
        "77": 77003,
        "777": 777000,
        "79": 79000,
        "8": 8003,
        "80": 80005,
        "81": 81002,
        "82": 82000,
        "84": 84000,
        "85": 85006,
        "86": 86004,
        "875": 875009,
        "9": 9008,
        "90": 90005,
        "91": 91012,
        "92": 92003,
        "96": 96004,
        "98": 98015,
        "99": 99005,
      },
      simplifiedInventoryJwt:
        "eyJraWQiOiIxIiwiYWxnIjoiUlM1MTIifQ.eyJzaGFyZElkIjoiQlIxIiwic3ViIjoiZDEwMGFlNmMtMDZhOS01YWFlLWE1MzUtZjY4N2RlNmQ1ZDUyIiwiY29udGFpbnNmMlAiOmZhbHNlLCJleHAiOjE2ODEyMzY0NzYsIml0ZW1zIjp7IkNIQU1QSU9OIjpbNjQsMSwyLDQsNSw3NCwxMCwxMSw3NiwxNDEsMTMsNzgsNzksMTUsMTYsMTcsMTgsMTksMjAsMjIsODYsMjMsMjcsOTIsMjgsMjksMzIsMzYsMTY0LDM3LDM5LDEwNCw4NzYsMjM2LDQ1LDExNCw1MywyNDUsNTUsNTYsMTIxLDU4LDYwLDI1NF0sIkNIQU1QSU9OX1NLSU4iOlsxOTAwOCwxMDQwMDMsOTIwMDMsNjQwMDUsNDUwMDEsNzYwMTEsMzkwMTgsNTMwMzYsNTUwMjEsNTMwMzcsMTcwMDcsMjU0MDAxLDM5MDAxLDIzNjAyNV19LCJpYXQiOjE2ODExNTAwNzZ9.efGAayCEgLE6i0AQI9bXTIuy7ITP7VJi7raX-vVvUdA-C_A0nPDQrTD19ExLGe9If0Jj09fdt3BwUN92rhgUuJJmdNUGFzoxb79PlO0BMby5NjQ77UHhmIBuouNzJ8PZwW4M0BtfmQcwToEwRolFx2uc-T9h-8Jo6Nufg1mQtpk",
    };

    return body;
  }
}

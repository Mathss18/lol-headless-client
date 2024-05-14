interface ParsedQueryToken {
  access_token: string;
  expires_in: string;
  id_token: string;
  iss: string;
  scope: string;
  session_state: string;
  token_type: string;
}

export class QueryTokenParser {
  public static parse(plainText: string): ParsedQueryToken {
    const splittedArray = plainText.split("#")[1].split("&");
    const map: ParsedQueryToken = {} as ParsedQueryToken;

    for (const splitted of splittedArray) {
      const pair = splitted.split("=");
      if (pair.length !== 2) continue;

      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      map[key] = value;
    }
    return map;
  }
}

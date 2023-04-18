import { CookieSupplier } from "../suppliers/cookie.supplier";
import { EntitlementSupplier } from "../suppliers/entitlement.supplier";
import { GeopasSupplier } from "../suppliers/geopas.supplier";
import { QueryTokenParser } from "../modules/query-token.parser";
import { QueueSupplier } from "../suppliers/queue.supplier";
import { RiotClientUser } from "../modules/riot-client";
import { SessionRefreshSupplier } from "../suppliers/session-refresh.supplier";
import { SessionSupplier } from "../suppliers/session.supplier";
import { ApiRequest } from "../services/http/api-request";
import { UserInfoSupplier } from "../suppliers/user-info.supplier";
import { Logger } from "../utils/logger.util";
import { PartySupplier } from "../suppliers/party.supplier";
import { UserData, UserDataSupplier } from "../suppliers/user-data.supplier";
import { Gamemode } from "../enums/gamemode.enum";
import { GamemodeSupplier } from "../suppliers/gamemode.supplier";
import { Role } from "../enums/role.enum";
import { RoleSupplier } from "../suppliers/role.supplier";
import { StartFindMatchSupplier } from "../suppliers/start-find-match.supplier";
import { AcceptMatchSupplier } from "../suppliers/accept-match.supplier";
import { SelectChampionSupplier } from "../suppliers/select-champion.supplier";
import { SiptSupplier } from "../suppliers/sipt.supplier";
import { InventorySupplier } from "../suppliers/inventory.supplier";

export class VirtualClient {
  private _apiRequest: ApiRequest;
  private _sessionToken: string;
  private _lolToken: string;
  private _riotToken: string;
  private _userInfoToken: string;
  private _siptToken: string;
  private _queueToken: string;
  private _entitlementsToken: string;
  private _username: string;
  private _password: string;
  private _userData: UserData;
  private _partyId: string;
  private _inventoryToken: string;

  constructor() {
    this._apiRequest = new ApiRequest();
  }

  public async login(username: string, password: string) {
    Logger.green("Starting login process... \n");
    this._username = username;
    this._password = password;

    try {
      const riotClientParsedTokens = QueryTokenParser.parse(
        await this.getTokens("CLIENT")
      );
      this._riotToken = riotClientParsedTokens.access_token;
      Logger.cyan(`[Riot Token]: ${this._riotToken} \n`);

      const lolParsedTokens = QueryTokenParser.parse(
        await this.getTokens("LOL")
      );
      this._lolToken = lolParsedTokens.access_token;
      Logger.cyan(`[LoL Token]: ${this._lolToken} \n`);

      this._userInfoToken = await this.getUserInfo();

      (this._entitlementsToken = await this.getEntitlements()),
        (this._queueToken = await this.getQueue()),
        (this._sessionToken = await this.getSession());

      const dataGeopas = await this.getGeopas();

      this._userData = await this.getUserData();

      this._inventoryToken = await this.getInventory();

      this._siptToken = await this.getSipt();

      setInterval(async () => {
        this._sessionToken = await this.getRefreshSession();
      }, +riotClientParsedTokens.expires_in * 100);
    } catch (error) {
      console.log(error);
    }
    Logger.green("Logged in! \n");
  }

  public async createLobby() {
    Logger.green("Creating lobby... \n");
    const partySupplier = new PartySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId,
      this._userData.id
    );

    const { data } = await partySupplier.makeRequest({});
    this._partyId = data.currentParty.partyId;
    Logger.cyan(`[Lobby ID]: ${this._partyId} \n`);
    Logger.green("Lobby created! \n");
  }

  public async selectGamemode(gamemode: Gamemode = Gamemode.SOLO_DUO) {
    Logger.green("Selecting gamemode... \n");
    const gamemodeSupplier = new GamemodeSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      gamemode
    );

    const { data } = await gamemodeSupplier.makeRequest({});
    const playersCount = data.currentParty.players.length;
    Logger.yellow(`[Players Count]: ${playersCount} \n`);
    Logger.green("Gamemode selected! \n");
  }

  public async selectRoles(roles: Role[] = [Role.FILL, Role.UNSELECTED]) {
    Logger.green("Selecting roles... \n");
    const roleSupplier = new RoleSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub,
      roles
    );

    const { data } = await roleSupplier.makeRequest({});
    Logger.green("Roles selected! \n");
  }

  public async startFindingMatch() {
    Logger.green("Starting to find match... \n");
    const startMatchSupplier = new StartFindMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub
    );

    const { data } = await startMatchSupplier.makeRequest({});
    Logger.green("Finding match! \n");
  }

  public async acceptMatch(): Promise<boolean> {
    const startMatchSupplier = new AcceptMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken
    );

    const { data } = await startMatchSupplier.makeRequest({});
    if (data?.payload !== undefined) {
      Logger.magenta("Match accepted! \n");
      return true;
    } else {
      Logger.green("Trying to accept match... \n");
      return false;
    }
  }

  public async selectChampion() {
    const selectChampionSupplier = new SelectChampionSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      22
    );

    const { data } = await selectChampionSupplier.makeRequest({});
    console.log(data);
  }

  private async getTokens(cookieType: "CLIENT" | "LOL") {
    const cookieSupplier = new CookieSupplier(this._apiRequest);
    cookieSupplier.cookieType = cookieType;

    const { headers: h1 } = await cookieSupplier.makeRequest({});

    cookieSupplier.additionalCookie = cookieSupplier.getCfbm(h1["set-cookie"]);
    const { headers: h2 } = await cookieSupplier.makeRequest({});

    cookieSupplier.additionalCookie = cookieSupplier.build(h2["set-cookie"]);
    const body = JSON.stringify({
      username: this._username,
      password: this._password,
      remember: false,
      language: "en_GB",
      type: "auth",
      region: null,
    });
    const { data } = await cookieSupplier.makeRequest({
      method: "PUT",
      body: body,
    });

    return data.response.parameters.uri;
  }

  private async getUserInfo(): Promise<string> {
    const riotClientUserInfo = new UserInfoSupplier(
      this._apiRequest,
      this._lolToken
    );
    const { data } = await riotClientUserInfo.makeRequest({});
    Logger.cyan(`[User Info Token]: ${data} \n`);
    return data;
  }

  private async getInventory(): Promise<string> {
    const inventorySupplier = new InventorySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId
    );
    const { data } = await inventorySupplier.makeRequest({});
    Logger.cyan(`[Inventory token]: ${data.data.itemsJwt} \n`);
    return data.data.itemsJwt;
  }

  private async getEntitlements() {
    const lolClientEntitlements = new EntitlementSupplier(
      this._apiRequest,
      this._riotToken
    );
    const { data } = await lolClientEntitlements.makeRequest({});
    Logger.cyan(`[Entitlements Token]: ${data.entitlements_token} \n`);
    return data.entitlements_token;
  }

  private async getQueue() {
    const queueSupplier = new QueueSupplier(
      this._apiRequest,
      this._lolToken,
      this._entitlementsToken,
      this._userInfoToken
    );

    const { data } = await queueSupplier.makeRequest({});
    Logger.cyan(`[Queue Token]: ${data.token} \n`);
    return data.token;
  }

  private async getSession() {
    const sessionSupplier = new SessionSupplier(
      this._apiRequest,
      this._queueToken,
      new RiotClientUser(this._riotToken).getSub()
    );
    const { data } = await sessionSupplier.makeRequest({});
    Logger.magenta(`[Session Token]: ${data} \n`);
    return data;
  }

  private async getGeopas() {
    const geopassSupplier = new GeopasSupplier(
      this._apiRequest,
      this._lolToken
    );
    const { data } = await geopassSupplier.makeRequest({});
    return data;
  }

  private async getSipt() {
    const siptSupplier = new SiptSupplier(this._apiRequest, this._sessionToken);
    const { data } = await siptSupplier.makeRequest({});
    Logger.cyan(`[Sipt Token]: ${data} \n`);
    return data;
  }

  private async getUserData(): Promise<UserData> {
    const userDataSupplier = new UserDataSupplier(
      this._apiRequest,
      this._sessionToken,
      new RiotClientUser(this._riotToken).getSub()
    );
    const data = await userDataSupplier.makeRequest({});
    Logger.cyan(`[User Data]: ${data} \n`);
    return data;
  }

  private async getRefreshSession() {
    const sessionRefreshSupplier = new SessionRefreshSupplier(
      this._apiRequest,
      this._sessionToken
    );
    const { data } = await sessionRefreshSupplier.makeRequest({});
    Logger.magenta(`[(REFRESH) Session Token]: ${data} \n`);
    return data;
  }

  public getAllTokens(): PublicTokens {
    return {
      riotToken: this._riotToken,
      lolToken: this._lolToken,
      entitlementsToken: this._entitlementsToken,
      userInfoToken: this._userInfoToken,
      queueToken: this._queueToken,
      sessionToken: this._sessionToken,
      // geopasToken: this._geopasToken,
      siptToken: this._siptToken,
    };
  }

  public userData(): UserData {
    return this._userData;
  }
}

export interface PublicTokens {
  riotToken: string;
  lolToken: string;
  entitlementsToken: string;
  userInfoToken: string;
  queueToken: string;
  sessionToken: string;
  // geopasToken: string;
  siptToken: string;
}

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
import { UnregisterSupplier } from "../suppliers/unregister.supplier";
import { PartyUserTokenSupplier } from "../suppliers/party-user-token.supplier";
import { Champion } from "../enums/champion.enum";
import { SummonerSpell } from "../enums/summoner-spell.enum";
import { setTimeout as sleep } from "timers/promises";
import { startSpinner, stopSpinner } from "../utils/spinner.util";
import { progressBar } from "../utils/progress-bar.util";
import { millisecondsToMinutes } from "../utils/utils";

export class VirtualClient {
  private _apiRequest: ApiRequest;
  private _sessionToken: string;
  private _lolToken: string;
  private _riotToken: string;
  private _userInfoToken: string;
  private _siptToken: string;
  private _queueToken: string;
  private _geoPassToken: string;
  private _entitlementsToken: string;
  private _username: string;
  private _password: string;
  private _userData: UserData;
  private _partyId: string;
  private _inventoryToken: string;
  private _playerChampions: Champion[];
  private _partyUserToken: string;

  constructor() {
    this._apiRequest = new ApiRequest();
  }

  public async login(username: string, password: string) {
    Logger.green("Starting login process... \n");
    this._username = username;
    this._password = password;

    try {
      const riotClientParsedTokens = QueryTokenParser.parse(await this.getTokens("CLIENT"));
      this._riotToken = riotClientParsedTokens.access_token;
      Logger.cyan(`[Riot Token]: ${this._riotToken} \n`);

      const lolParsedTokens = QueryTokenParser.parse(await this.getTokens("LOL"));
      this._lolToken = lolParsedTokens.access_token;
      Logger.cyan(`[LoL Token]: ${this._lolToken} \n`);

      this._userInfoToken = await this.getUserInfo();

      this._entitlementsToken = await this.getEntitlements();

      this._queueToken = await this.getQueue();

      this._sessionToken = await this.getSession();

      this._geoPassToken = await this.getGeopas();

      this._userData = await this.getUserData();

      [this._inventoryToken, this._playerChampions] = await this.getInventory();

      this._partyUserToken = await this.getPartyUserToken();

      this._siptToken = await this.getSipt();

      await sleep(1000);

      setInterval(async () => {
        this._sessionToken = await this.getRefreshSession();
      }, +riotClientParsedTokens.expires_in * 100);
    } catch (error) {
      console.log(error);
      Logger.red("Error while logging in! \n");
      process.exit(1);
    }
    Logger.green("[Virtual Client] Logged in! \n");
  }

  public getPlayerChampions(): Champion[] {
    return this._playerChampions;
  }

  public async getPartyUserToken() {
    const partyUserTokenSupplier = new PartyUserTokenSupplier(this._apiRequest, this._sessionToken, this._userData.sub);
    const { data } = await partyUserTokenSupplier.makeRequest({});
    Logger.cyan(`[Party User Token]: ${data} \n`);
    return data;
  }

  public async unregisterLobby() {
    Logger.green("Unregitering lobby... \n");
    const unregisterSupplier = new UnregisterSupplier(this._apiRequest, this._sessionToken, this._userData.sub);
    await unregisterSupplier.makeRequest({});
    Logger.green("Lobby Unregistered \n");
  }

  public async createLobby() {
    Logger.green("Creating lobby... \n");
    const partySupplier = new PartySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken,
      this._partyUserToken,
      this._userInfoToken
    );

    const { data } = await partySupplier.makeRequest({});
    this._partyId = data.currentParty.partyId;
    Logger.cyan(`[Lobby ID]: ${this._partyId} \n`);
    Logger.green("Lobby created! \n");
  }

  public async selectGamemode(gamemode: Gamemode = Gamemode.RANKED_SOLO_DUO) {
    Logger.green("Selecting gamemode... \n");
    const gamemodeSupplier = new GamemodeSupplier(this._apiRequest, this._sessionToken, this._partyId, gamemode);

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
    const activeRestrictions = data.currentParty?.activeRestrictions?.gatekeeperRestrictions;
    if (activeRestrictions?.length > 0) {
      const reason = activeRestrictions[0].reason;
      const remainingMillis = activeRestrictions[0].remainingMillis;
      Logger.red("You are restricted from matchmaking! \n");
      Logger.red(`Reason: ${reason} \n`);
      Logger.red(`Time: ${millisecondsToMinutes(remainingMillis)}`);

      await progressBar(0, true, remainingMillis);
    }
    Logger.green("Finding match! \n");
  }

  public async acceptMatchLoop(summonerSpells: SummonerSpell[]): Promise<boolean> {
    const spin = startSpinner("Searching for a match...");
    let accepted = false;
    while (!accepted) {
      accepted = await this.acceptMatch(summonerSpells);
      await sleep(7500);
    }
    stopSpinner(spin);
    return accepted;
  }

  private async acceptMatch(summonerSpells: SummonerSpell[]): Promise<boolean> {
    const startMatchSupplier = new AcceptMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken,
      summonerSpells
    );

    const { data } = await startMatchSupplier.makeRequest({});
    if (data?.payload !== undefined) {
      Logger.magenta("Match accepted! \n");
      return true;
    } else {
      return false;
    }
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
    const riotClientUserInfo = new UserInfoSupplier(this._apiRequest, this._lolToken);
    const { data } = await riotClientUserInfo.makeRequest({});
    Logger.cyan(`[User Info Token]: ${data} \n`);
    return data;
  }

  private async getInventory(): Promise<[string, Champion[]]> {
    const inventorySupplier = new InventorySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId
    );
    const { data } = await inventorySupplier.makeRequest({});
    Logger.cyan(`[Inventory token]: ${data.data.itemsJwt} \n`);
    return [data.data.itemsJwt, data.data.items.CHAMPION];
  }

  private async getEntitlements() {
    const lolClientEntitlements = new EntitlementSupplier(this._apiRequest, this._riotToken);
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
    Logger.cyan(`[Session Token]: ${data} \n`);
    return data;
  }

  private async getGeopas() {
    const geopassSupplier = new GeopasSupplier(this._apiRequest, this._lolToken);
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
    Logger.cyan(`[User Data]:\n`);
    console.log(data);
    return data;
  }

  private async getRefreshSession() {
    const sessionRefreshSupplier = new SessionRefreshSupplier(this._apiRequest, this._sessionToken);
    const { data } = await sessionRefreshSupplier.makeRequest({});
    Logger.cyan(`[(REFRESH) Session Token]: ${data} \n`);
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
      geopasToken: this._geoPassToken,
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
  geopasToken: string;
  siptToken: string;
}

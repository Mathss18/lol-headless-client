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
import { getRegion } from "../config/regions";
import { Region } from "../enums/region.enum";
import { EventCallbackName } from "../enums/event-callback-name.enum";
import { CallbackEvent } from "../main";
import { PartyTypeSupplier } from "../suppliers/party-type.supplier";
import { VersionSupplier } from "../suppliers/version.supplier";
import { JoinLobbySupplier } from "../suppliers/join-lobby.supplier";

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
  private _region: Region;
  private _partyType: string | undefined;
  public gameVersion: string | undefined;
  public clientVersion: string | undefined;
  private _callback: (data: CallbackEvent) => void;

  constructor() {
    this._apiRequest = new ApiRequest();
  }

  public listen(callback: (data: CallbackEvent) => void) {
    this._callback = callback;
  }

  public async login(
    username: string,
    password: string,
    region: Region = Region.BR
  ) {
    this.gameVersion = await this.getGameVersion(region);
    this.clientVersion = await this.getClientVersion();
    Logger.green("Starting login process... \n");
    Logger.green(`Selected Region: ${getRegion(region).name} \n`);
    this._username = username;
    this._password = password;
    this._region = region;

    try {
      const riotClientParsedTokens = QueryTokenParser.parse(
        await this.getTokens("CLIENT")
      );
      this._riotToken = riotClientParsedTokens.access_token;
      this.callCallback(
        EventCallbackName.VIRTUAL_CLIENT_RIOT_TOKEN,
        this._riotToken
      );
      Logger.cyan(`[Riot Token]: ${this._riotToken} \n`);

      const lolParsedTokens = QueryTokenParser.parse(
        await this.getTokens("LOL")
      );
      this._lolToken = lolParsedTokens.access_token;
      this.callCallback(
        EventCallbackName.VIRTUAL_CLIENT_LOL_TOKEN,
        this._lolToken
      );
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
        this.callCallback(
          EventCallbackName.VIRTUAL_CLIENT_SESSION_TOKEN,
          this._lolToken
        );
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
    const partyUserTokenSupplier = new PartyUserTokenSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._region,
      this.clientVersion
    );
    const { data } = await partyUserTokenSupplier.makeRequest({});
    Logger.cyan(`[Party User Token]: ${data} \n`);
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_PARTY_TOKEN, data);
    return data;
  }

  public async unregisterLobby() {
    Logger.green("Unregitering lobby... \n");
    const unregisterSupplier = new UnregisterSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._region,
      this.clientVersion
    );
    await unregisterSupplier.makeRequest({});
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_LOBBY_UNREGISTERED);
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
      this._userInfoToken,
      this._region,
      this.gameVersion,
      this.clientVersion
    );

    const { data } = await partySupplier.makeRequest({});
    this._partyId = data.currentParty.partyId;
    Logger.cyan(`[Lobby ID]: ${this._partyId} \n`);
    Logger.green("Lobby created! \n");
    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_LOBBY_CREATED,
      this._partyId
    );
  }

  public async changePartyType(type: "open" | "closed") {
    const partyTypeSupplier = new PartyTypeSupplier(
      this._apiRequest,
      this._lolToken,
      this._partyId,
      type,
      this._region,
      this.clientVersion
    );
    const { data } = await partyTypeSupplier.makeRequest({});
    Logger.cyan(`[Party Type Supplier]: ${data} \n`);
    // this.callCallback(EventCallbackName.VIRTUAL_CLIENT_USER_INFO_TOKEN, data);
    this._partyType = type;
    return data;
  }

  public async selectGamemode(gamemode: Gamemode = Gamemode.RANKED_SOLO_DUO) {
    Logger.green("Selecting gamemode... \n");
    const gamemodeSupplier = new GamemodeSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      gamemode,
      this._region,
      this.clientVersion
    );

    const { data } = await gamemodeSupplier.makeRequest({});
    const playersCount = data.currentParty.players.length;
    Logger.yellow(`[Players Count]: ${playersCount} \n`);
    Logger.green("Gamemode selected! \n");
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_SELECT_GAMEMODE, data);
    return data;
  }

  public async selectRoles(roles: Role[] = [Role.FILL, Role.UNSELECTED]) {
    Logger.green("Selecting roles... \n");
    const roleSupplier = new RoleSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub,
      roles,
      this._region,
      this.clientVersion
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await roleSupplier.makeRequest({});
    Logger.green("Roles selected! \n");
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_ROLES_SELECTED);
  }

  public async startFindingMatch() {
    Logger.green("Starting to find match... \n");
    const startMatchSupplier = new StartFindMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub,
      this._region,
      this.clientVersion
    );

    const { data } = await startMatchSupplier.makeRequest({});
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_FINDING_MATCH);
    const activeRestrictions =
      data.currentParty?.activeRestrictions?.gatekeeperRestrictions;
    if (activeRestrictions?.length > 0) {
      const reason = activeRestrictions[0].reason;
      const remainingMillis = activeRestrictions[0].remainingMillis;
      Logger.red("You are restricted from matchmaking! \n");
      Logger.red(`Reason: ${reason} \n`);
      Logger.red(`Time: ${millisecondsToMinutes(remainingMillis)}`);
      this.callCallback(EventCallbackName.VIRTUAL_CLIENT_MATCH_RESTRICTED, {
        reason,
        remainingMillis,
      });

      await progressBar(0, true, remainingMillis);
    }
    Logger.green("Finding match! \n");
  }

  public async acceptMatchLoop(
    summonerSpells: SummonerSpell[]
  ): Promise<boolean> {
    const spin = startSpinner("Searching for a match...");
    let accepted = false;
    while (!accepted) {
      accepted = await this.acceptMatch(summonerSpells);
      await sleep(7500);
    }
    stopSpinner(spin);
    return accepted;
  }

  public async joinOpenParty(friendPuuid: string, partyId: string) {
    const joinLobbySupplier = new JoinLobbySupplier(
      this._apiRequest,
      this._sessionToken,
      partyId,
      friendPuuid,
      this._region,
      this.clientVersion
    );

    const { data } = await joinLobbySupplier.makeRequest({});
    console.log({ data });
  }

  public getPartyId() {
    return this._partyId;
  }

  public getCurrentUser() {
    return this._userData;
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
      partyUserToken: this._partyUserToken,
    };
  }

  public userData(): UserData {
    return this._userData;
  }

  private async acceptMatch(summonerSpells: SummonerSpell[]): Promise<boolean> {
    const startMatchSupplier = new AcceptMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken,
      summonerSpells,
      this._region,
      this.clientVersion
    );

    const { data } = await startMatchSupplier.makeRequest({});
    if (data?.payload !== undefined) {
      Logger.magenta("Match accepted! \n");
      this.callCallback(EventCallbackName.VIRTUAL_CLIENT_MATCH_ACCEPTED);
      return true;
    } else {
      return false;
    }
  }

  private async getTokens(cookieType: "CLIENT" | "LOL") {
    const cookieSupplier = new CookieSupplier(this._apiRequest);
    cookieSupplier.cookieType = cookieType;

    const { headers: h1 } = await cookieSupplier.makeRequest({});

    cookieSupplier.additionalCookie = cookieSupplier.getCfbm(h1["set-cookie"]!);
    const { headers: h2 } = await cookieSupplier.makeRequest({});

    cookieSupplier.additionalCookie = cookieSupplier.build(h2["set-cookie"]!);
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
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_USER_INFO_TOKEN, data);
    return data;
  }

  private async getInventory(): Promise<[string, Champion[]]> {
    const inventorySupplier = new InventorySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId,
      this._region,
      this.clientVersion
    );
    const { data } = await inventorySupplier.makeRequest({});
    Logger.cyan(`[Inventory token]: ${data.data.itemsJwt} \n`);
    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_INVENTORY_TOKEN,
      data.data.itemsJwt
    );
    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN,
      data.data.items.CHAMPION
    );
    return [data.data.itemsJwt, data.data.items.CHAMPION];
  }

  private async getEntitlements() {
    const lolClientEntitlements = new EntitlementSupplier(
      this._apiRequest,
      this._riotToken
    );
    const { data } = await lolClientEntitlements.makeRequest({});
    Logger.cyan(`[Entitlements Token]: ${data.entitlements_token} \n`);

    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_ENTITLEMENT_TOKEN,
      data.entitlements_token
    );
    return data.entitlements_token;
  }

  private async getQueue() {
    const queueSupplier = new QueueSupplier(
      this._apiRequest,
      this._lolToken,
      this._entitlementsToken,
      this._userInfoToken,
      this._region,
      this.clientVersion
    );

    const { data } = await queueSupplier.makeRequest({});
    Logger.cyan(`[Queue Token]: ${data.token} \n`);
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_QUEUE_TOKEN, data.token);
    return data.token;
  }

  private async getSession() {
    const sessionSupplier = new SessionSupplier(
      this._apiRequest,
      this._queueToken,
      new RiotClientUser(this._riotToken).getSub(),
      this._region,
      this.clientVersion
    );
    const { data } = await sessionSupplier.makeRequest({});
    Logger.cyan(`[Session Token]: ${data} \n`);
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_SESSION_TOKEN, data);
    return data;
  }

  private async getGeopas() {
    const geopassSupplier = new GeopasSupplier(
      this._apiRequest,
      this._lolToken
    );
    const { data } = await geopassSupplier.makeRequest({});
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_GEOPASS_TOKEN, data);
    return data;
  }

  private async getGameVersion(region: Region) {
    const versionSupplier = new VersionSupplier(this._apiRequest, region);
    const { data } = await versionSupplier.makeRequest({});
    const gameVersion = data.releases[0].compat_version.id;
    Logger.cyan(`[Game Version]: ${gameVersion} \n`);
    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_GAME_VERSION,
      gameVersion
    );
    return gameVersion;
  }

  private async getClientVersion() {
    const clientVersion = "14.12.595.2083";
    Logger.cyan(`[Client Version]: ${clientVersion} \n`);
    this.callCallback(
      EventCallbackName.VIRTUAL_CLIENT_CLIENT_VERSION,
      clientVersion
    );
    return clientVersion;
  }

  private async getSipt() {
    const siptSupplier = new SiptSupplier(
      this._apiRequest,
      this._sessionToken,
      this._region,
      this.clientVersion
    );
    const { data } = await siptSupplier.makeRequest({});
    Logger.cyan(`[Sipt Token]: ${data} \n`);

    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_SIPT_TOKEN, data);
    return data;
  }

  private async getUserData(): Promise<UserData> {
    const userDataSupplier = new UserDataSupplier(
      this._apiRequest,
      this._sessionToken,
      new RiotClientUser(this._riotToken).getSub(),
      this._region,
      this.clientVersion
    );
    const data = await userDataSupplier.makeRequest({});
    Logger.cyan(`[User Data]:\n`);
    Logger.default(data);
    this.callCallback(EventCallbackName.VIRTUAL_CLIENT_USER_DATA_TOKEN, data);
    return data;
  }

  private callCallback(eventName: EventCallbackName, data?: any) {
    if (this._callback) this._callback({ eventName, data });
  }

  private async getRefreshSession() {
    const sessionRefreshSupplier = new SessionRefreshSupplier(
      this._apiRequest,
      this._sessionToken,
      this._region,
      this.clientVersion
    );
    const { data } = await sessionRefreshSupplier.makeRequest({});
    Logger.cyan(`[(REFRESH) Session Token]: ${data} \n`);
    return data;
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
  partyUserToken: string;
}

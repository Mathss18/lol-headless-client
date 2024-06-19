import * as dotenv from "dotenv";
dotenv.config();
import { PublicTokens, VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import { RtmpClient } from "./services/rtmp/rtmp-client.service";
import { SummonerSpell } from "./enums/summoner-spell.enum";
import { Champion } from "./enums/champion.enum";
import {
  ChatStatus,
  PlayerInfo,
  XmppClient,
} from "./services/xmpp/xmpp.client.service";
import { Region } from "./enums/region.enum";
import { getRegion } from "./config/regions";
import { EventCallbackName } from "./enums/event-callback-name.enum";
import { UserData } from "./suppliers/user-data.supplier";

export type CallbackEvent = {
  eventName: EventCallbackName;
  data?: any;
};

export class HeadlessClient {
  private virtualClient: VirtualClient;
  private rtmpClient: RtmpClient;
  private xmppClient: XmppClient;
  private region: Region;
  private callback: (data: CallbackEvent) => void;

  constructor({ region }: { region: Region }) {
    this.region = region;
  }

  public listen(callback: (data: CallbackEvent) => void) {
    this.callback = callback;
  }

  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    this.virtualClient = await this.setupVirtualClient(
      username,
      password,
      this.region
    );
    this.rtmpClient = await this.setupRtmp(this.virtualClient, username);
    this.xmppClient = await this.setupXmpp(this.virtualClient);
    /*
    console.dir(error);
    console.dir(error?.response);
    console.dir(error?.response?.data);
    console.dir(error?.response?.data?.payload);
    console.dir(error?.error);
    console.dir(error?.data);
    console.dir(error.data?.payload);
    */
  }

  public getAllTokens(): PublicTokens {
    return this.virtualClient.getAllTokens();
  }

  public getPartyId(): string {
    return this.virtualClient.getPartyId();
  }

  public getCurrentUser(): UserData {
    return this.virtualClient.getCurrentUser();
  }

  public async changePartyType(type: "open" | "closed") {
    return await this.virtualClient.changePartyType(type);
  }

  public async addFriend({
    username,
    tagline,
  }: {
    username: string;
    tagline: string;
  }) {
    await this.xmppClient.addFriend(username, tagline);
  }

  public async sendMessage({ message, jid }: { message: string; jid: string }) {
    await this.xmppClient.sendMessage(message, jid);
  }

  public joinOpenParty({ friendPuuid }: { friendPuuid: string }) {
    this.xmppClient.joinOpenParty(friendPuuid).then(async (partyId) => {
      await this.virtualClient.joinOpenParty(friendPuuid, partyId);
    });
  }

  public async setInfo({
    status,
    statusMessage,
    playerInfo,
  }: {
    status: ChatStatus;
    statusMessage?: string;
    playerInfo?: PlayerInfo;
  }) {
    await this.xmppClient.setInfo({ status, playerInfo, statusMessage });
  }

  public async getChatHistory({ jid }: { jid: string }) {
    await this.xmppClient.getChatHistory(jid);
  }

  public getPlayerChampions() {
    return this.virtualClient.getPlayerChampions();
  }

  public getFriendList() {
    return this.xmppClient.getFriendList();
  }

  public async createLobby() {
    await this.virtualClient.unregisterLobby();
    await this.virtualClient.createLobby();
  }

  public async selectGamemode({ gamemode }: { gamemode: Gamemode }) {
    await this.virtualClient.selectGamemode(gamemode);
  }

  public async selectRoles({ roles }: { roles: Role[] }) {
    await this.virtualClient.selectRoles(roles);
  }

  public async findMatch({
    summonerSpells,
  }: {
    summonerSpells: SummonerSpell[];
  }) {
    await this.virtualClient.startFindingMatch();
    await this.virtualClient.acceptMatchLoop(summonerSpells);
  }

  public banChampion({ champion }: { champion: Champion }) {
    this.rtmpClient.banChampionsLoop(champion);
  }

  public selectChampion({ champions }: { champions: Champion[] }) {
    this.rtmpClient.selectChampionsLoop(champions);
  }

  public async logout() {
    await this.virtualClient.unregisterLobby();
    await this.xmppClient.disconnect();
  }

  private async setupVirtualClient(
    username: string,
    password: string,
    region: Region
  ): Promise<VirtualClient> {
    this.virtualClient = new VirtualClient();

    if (this.callback) this.virtualClient.listen(this.callback);

    await this.virtualClient.login(username, password, region);
    return this.virtualClient;
  }

  private async setupRtmp(
    virtualClient: VirtualClient,
    username: string
  ): Promise<RtmpClient> {
    const tokens = virtualClient.getAllTokens();
    const userData = virtualClient.userData();
    const { rtmpHost, rtmpPort } = getRegion(this.region);

    this.rtmpClient = new RtmpClient(
      rtmpHost,
      rtmpPort,
      tokens,
      userData,
      username
    );

    if (this.callback) this.rtmpClient.listen(this.callback);

    await this.rtmpClient.connect();
    await this.rtmpClient.handshake();
    await this.rtmpClient.startListening();
    await this.rtmpClient.connectToRiot();
    await this.rtmpClient.login();
    await this.rtmpClient.login2();
    return this.rtmpClient;
  }

  private async setupXmpp(virtualClient: VirtualClient): Promise<XmppClient> {
    const { lolToken, geopasToken, entitlementsToken } =
      virtualClient.getAllTokens();

    this.xmppClient = new XmppClient(
      lolToken,
      geopasToken,
      entitlementsToken,
      this.region
    );

    if (this.callback) this.xmppClient.listen(this.callback);

    await this.xmppClient.connect();
    return this.xmppClient;
  }
}

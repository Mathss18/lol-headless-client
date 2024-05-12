import * as dotenv from "dotenv";
dotenv.config();
import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import { RtmpClient } from "./services/rtmp/rtmp-client.service";
import { Logger } from "./utils/logger.util";
import { SummonerSpell } from "./enums/summoner-spell.enum";
import { Champion } from "./enums/champion.enum";
import { pass, user } from "./args";
import { REGION } from "./config/regions";
import { XmppClient } from "./services/xmpp/xmpp.client.service";

class Main {
  private virtualClient: VirtualClient;
  private rtmpClient: RtmpClient;
  private xmppClient: XmppClient;

  async start() {
    try {
      this.virtualClient = await this.setupVirtualClient();
      this.rtmpClient = await this.setupRtmp(this.virtualClient);
      this.xmppClient = await this.setupXmpp(this.virtualClient);
      this.startGame();
    } catch (error) {
      console.dir(error);
      console.dir(error?.response);
      console.dir(error?.response?.data);
      console.dir(error?.response?.data?.payload);
      console.dir(error?.error);
      console.dir(error?.data);
      console.dir(error.data?.payload);
    }
  }

  async stop() {
    await this.virtualClient.unregisterLobby();
    await this.xmppClient.disconnect();
  }

  async setupVirtualClient(): Promise<VirtualClient> {
    this.virtualClient = new VirtualClient();
    await this.virtualClient.login(user, pass);
    return this.virtualClient;
  }

  async setupRtmp(virtualClient: VirtualClient): Promise<RtmpClient> {
    const tokens = virtualClient.getAllTokens();
    const userData = virtualClient.userData();

    this.rtmpClient = new RtmpClient(REGION.rtmpHost, REGION.rtmpPort, tokens, userData);

    try {
      await this.rtmpClient.connect();
      await this.rtmpClient.handshake();
      await this.rtmpClient.startListening();
      await this.rtmpClient.connectToRiot();
      await this.rtmpClient.login();
      await this.rtmpClient.login2();
      return this.rtmpClient;
    } catch (error) {
      console.error("[RTMP] Failed to connect or handshake:", error);
    }
  }

  async setupXmpp(virtualClient: VirtualClient): Promise<XmppClient> {
    const tokens = virtualClient.getAllTokens();
    this.xmppClient = new XmppClient(tokens.lolToken, tokens.geopasToken, tokens.entitlementsToken);

    try {
      await this.xmppClient.connect();
      return this.xmppClient;
    } catch (error) {
      console.error("[XMPP] Failed to connect or handshake:", error);
    }
  }

  async startGame() {
    await this.xmppClient.addFriend("Byfa", "BR1");
    await this.xmppClient.setStatus("chat");
    await this.xmppClient.getFriendList();
    await this.xmppClient.sendMessage("isso eh teste", "49f9f9af-1f50-5427-a386-915b9914e8e2@br1.pvp.net/RC-1780326641");
    await this.xmppClient.sendMessage("isso tbm eh teste", "49f9f9af-1f50-5427-a386-915b9914e8e2@br1.pvp.net");
    // await this.virtualClient.unregisterLobby();
    // await this.virtualClient.createLobby();
    // await this.virtualClient.selectGamemode(Gamemode.TFT_NORMAL);
    // await this.virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
    // await this.virtualClient.startFindingMatch();
    // await this.virtualClient.acceptMatchLoop([SummonerSpell.FLASH, SummonerSpell.IGNITE]);
    // this.rtmpClient.banChampionsLoop(Champion.NONE);
    // this.rtmpClient.selectChampionsLoop(this.virtualClient.getPlayerChampions());
  }
}

const main = new Main();
main.start();

process.on("SIGINT", async () => {
  Logger.red("Exiting... \n");
  await main.stop();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  Logger.red("Exiting... \n");
  await main.stop();
  process.exit(0);
});

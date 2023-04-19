import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import { RtmpClient } from "./services/rtmp/rtmp-client.service";
import { Logger } from "./utils/logger.util";
import { SummonerSpell } from "./enums/summoner-spell.enum";
import * as dotenv from "dotenv";
import { Champion } from "./enums/champion.enum";
import { pass, user } from "./args";

dotenv.config();

class Main {
  private virtualClient: VirtualClient;
  private rtmpClient: RtmpClient;

  async start() {
    try {
      this.virtualClient = await this.setupVirtualClient();
      this.rtmpClient = await this.setupRtmp(this.virtualClient);
      await this.startGame();
    } catch (error) {
      console.dir(error);
    }
  }

  async stop() {
    await this.virtualClient.unregisterLobby();
  }

  async setupVirtualClient(): Promise<VirtualClient> {
    this.virtualClient = new VirtualClient();
    await this.virtualClient.login(user, pass);
    return this.virtualClient;
  }

  async setupRtmp(virtualClient: VirtualClient): Promise<RtmpClient> {
    const host = "feapp.br1.lol.pvp.net";
    const port = 2099;
    const tokens = virtualClient.getAllTokens();
    const userData = virtualClient.userData();

    this.rtmpClient = new RtmpClient(host, port, tokens, userData);

    try {
      await this.rtmpClient.connect();
      await this.rtmpClient.handshake();
      await this.rtmpClient.startListening();
      await this.rtmpClient.connectToRiot();
      await this.rtmpClient.login();
      await this.rtmpClient.login2();
      return this.rtmpClient;
    } catch (error) {
      console.error("Failed to connect or handshake:", error);
    }
  }

  async startGame() {
    await this.virtualClient.createLobby();
    await this.virtualClient.selectGamemode(Gamemode.DRAFT_PICK);
    await this.virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
    await this.virtualClient.startFindingMatch();
    await this.virtualClient.acceptMatchLoop([
      SummonerSpell.FLASH,
      SummonerSpell.IGNITE,
    ]);
    this.rtmpClient.banChampionsLoop(Champion.ZOE);
    this.rtmpClient.selectChampionsLoop(
      this.virtualClient.getPlayerChampions()
    );
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

import { PublicTokens, VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import * as dotenv from "dotenv";
import { RtmpClient } from "./services/rtmp/rtmp-client.service";
import { Champion } from "./enums/champion.enum";
import { exit } from "process";
import { setTimeout } from "timers/promises";
import { Logger } from "./utils/logger.util";
import { SummonerSpell } from "./enums/summoner-spell.enum";

dotenv.config();

class Main {
  async start() {
    try {
      const virtualClient = await this.setupVirtualClient();
      const rtmpClient = await this.setupRtmp(virtualClient);
      await this.startGame(virtualClient, rtmpClient);
    } catch (error) {
      console.dir(error);
    }
  }

  async setupVirtualClient(): Promise<VirtualClient> {
    const virtualClient = new VirtualClient();
    await virtualClient.login(process.env.USERNAME, process.env.PASSWORD);
    return virtualClient;
  }

  async setupRtmp(virtualClient: VirtualClient): Promise<RtmpClient> {
    const host = "feapp.br1.lol.pvp.net";
    const port = 2099;
    const tokens = virtualClient.getAllTokens();
    const userData = virtualClient.userData();

    const client = new RtmpClient(host, port, tokens, userData);

    try {
      await client.connect();
      await client.handshake();
      await client.startListening();
      await client.connectToRiot();
      await client.login();
      await client.login2();
      return client;
    } catch (error) {
      console.error("Failed to connect or handshake:", error);
    }
  }

  async startGame(virtualClient: VirtualClient, rtmpClient: RtmpClient) {
    await virtualClient.unregisterLobby();
    await virtualClient.createLobby();
    await virtualClient.selectGamemode(Gamemode.SOLO_DUO);
    await virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
    await virtualClient.startFindingMatch();

    let matchFound = false;
    const acceptInterval = setInterval(async () => {
      matchFound = await virtualClient.acceptMatch([
        SummonerSpell.FLASH,
        SummonerSpell.IGNITE,
      ]);
      if (!matchFound) return;
      clearInterval(acceptInterval);
      Logger.white("Adding delay to allow the game to start... (45s) \n");
      await setTimeout(45000);
      await this.selectChampionsLoop(
        rtmpClient,
        virtualClient.getPlayerChampions()
      );
    }, 2000);
  }

  async selectChampionsLoop(rtmpClient: RtmpClient, champions: Champion[]) {
    const championInterval = setInterval(async () => {
      if (rtmpClient.pickState.isChampPicked) {
        clearInterval(championInterval);
        console.log(rtmpClient.pickState);
      }
      await rtmpClient.selectChampion(champions);
    }, 2000);
  }
}

const main = new Main();
main.start();

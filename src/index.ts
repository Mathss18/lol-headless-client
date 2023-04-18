import { PublicTokens, VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import * as dotenv from "dotenv";
import { RtmpClient } from "./services/rtmp/rtmp-client.service";
import { Champion } from "./enums/champion.enum";
import { exit } from "process";
dotenv.config();

class Main {
  async start() {
    try {
      const virtualClient = new VirtualClient();
      await virtualClient.login(process.env.USERNAME, process.env.PASSWORD);
      const rtmpClient = await this.startRtmp(virtualClient);
      await virtualClient.createLobby();
      await virtualClient.selectGamemode(Gamemode.SOLO_DUO);
      await virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
      await virtualClient.startFindingMatch();

      let found = false;
      const acceptInterval = setInterval(async () => {
        found = await virtualClient.acceptMatch();
        if (found) {
          clearInterval(acceptInterval);
          let currentPosition = 1;
          const championInterval = setInterval(async () => {
            await rtmpClient.selectChampion(currentPosition, [
              Champion.ASHE,
              Champion.AMUMU,
              Champion.ANNIE,
              Champion.KAYN,
              Champion.GAREN,
              Champion.GAREN,
              Champion.SORAKA,
              Champion.MISSFORTUNE,
              Champion.RAMMUS,
            ]);

            // Increment the position, resetting it to 1 when it reaches 11
            currentPosition = currentPosition === 10 ? 1 : currentPosition + 1;
          }, 500);
        }
      }, 2000);
    } catch (error) {
      console.dir(error);
    }
  }

  async startRtmp(virtualClient: VirtualClient): Promise<RtmpClient> {
    const host = "feapp.br1.lol.pvp.net";
    const port = 2099;

    const client = new RtmpClient(
      host,
      port,
      virtualClient.getAllTokens(),
      virtualClient.userData()

      // tokens,
      // userData
    );

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
}
const main = new Main();
main.start();

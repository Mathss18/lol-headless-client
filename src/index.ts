import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import { Client } from "rtmp-client";
import * as dotenv from "dotenv";
import { RtmpClient } from "./services/rtmp-client.service";
dotenv.config();

class Main {
  async start() {
    try {
      const virtualClient = new VirtualClient();
      await virtualClient.login(process.env.USERNAME, process.env.PASSWORD);
      this.test(virtualClient);
      return;
      await virtualClient.createLobby();
      await virtualClient.selectGamemode(Gamemode.SOLO_DUO);
      await virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
      await virtualClient.startFindingMatch();

      let found = false;
      const acceptInterval = setInterval(async () => {
        found = await virtualClient.acceptMatch();
        if (found) {
          clearInterval(acceptInterval);
          const championInterval = setInterval(async () => {
            await virtualClient.selectChampion();
          }, 3000);
        }
      }, 2000);

      // @todo: select champion
    } catch (error) {
      console.dir(error);
    }
  }

  async test(virtualClient) {
    const host = "feapp.br1.lol.pvp.net";
    const port = 2099;

    const client = new RtmpClient(
      host,
      port,
      virtualClient.getAllTokens(),
      virtualClient.userData()
    );

    try {
      await client.connect();
      await client.authorize();
      await client.startListening();
      await client.connectToRiot();
      await client.login();
      await client.selectChampion();
      console.log("Connected and handshake completed.");
    } catch (error) {
      console.error("Failed to connect or handshake:", error);
    } finally {
      // client.close();
    }
  }
}

const main = new Main();
main.start();
// main.test();

import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import * as dotenv from "dotenv";
dotenv.config();

class Main {
  async start() {
    try {
      const virtualClient = new VirtualClient();
      await virtualClient.login(process.env.USERNAME, process.env.PASSWORD);
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
}

const main = new Main();
main.start();

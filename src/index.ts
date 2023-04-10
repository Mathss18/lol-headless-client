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
    } catch (error) {
      console.log(error)
    }
  }
}

const main = new Main();
main.start();

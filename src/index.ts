import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";

class Main {
  async start() {
    try {
      const virtualClient = new VirtualClient();
      await virtualClient.login("Lannydh", "88121747m");
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

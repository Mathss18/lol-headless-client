import { VirtualClient } from "./client/VirtualClient";
import { Gamemode } from "./enums/gamemode.enum";
import { Role } from "./enums/role.enum";
import { authenticate } from "league-connect";

class Main {
  async start() {
    // const virtualClient = new VirtualClient();
    // await virtualClient.login("Lannydh", "88121747m");
    // await virtualClient.createLobby();
    // await virtualClient.selectGamemode(Gamemode.SOLO_DUO);
    // await virtualClient.selectRoles([Role.FILL, Role.UNSELECTED]);
    // await virtualClient.startFindingMatch();

    const credentials = await authenticate();
    console.log(credentials); // { password: '37dn2gsxH3ns', port: 37241 }
  }
}

const main = new Main();
main.start();

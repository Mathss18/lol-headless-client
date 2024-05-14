import { Champion, Gamemode, Region, Role, HeadlessClient } from "./index";

const hc = new HeadlessClient({ region: Region.BR });
const main = async () => {
  await hc.login({ username: "YOUR-USERNAME", password: "YOUR-PASSWORD" });
  await hc.addFriend({ username: "FRIEND-USERNAME", tagline: "FRIEND-TAGLINE" });
  await hc.setStatus({ status: "chat" });
  await hc.sendMessage({ message: "Hi", jid: "FRIEND-JID" });
  await hc.createLobby();
  await hc.selectGamemode({ gamemode: Gamemode.TFT_NORMAL });
  await hc.selectRoles({ roles: [Role.TOP, Role.JUNGLE] });
  await hc.findMatch({});
  hc.banChampion({ champion: Champion.NONE });
  hc.selectChampion({ champions: hc.getPlayerChampions() });
};
main();

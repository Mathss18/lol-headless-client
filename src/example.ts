import { Champion, Gamemode, Region, Role, HeadlessClient, CallbackEvent } from "./index";

const hc = new HeadlessClient({ region: Region.BR });

const callback = ({ eventName, data }: CallbackEvent) => console.log({ eventName, data });

const main = async () => {
  hc.listen(callback);

  await hc.login({ username: "YOUR-USERNAME", password: "YOUR-PASSWORD" });

  await hc.addFriend({ username: "FRIEND-USERNAME", tagline: "FRIEND-TAGLINE" });

  await hc.setInfo({ status: "chat" });

  await hc.sendMessage({ message: "Hi", jid: "FRIEND-JID" });

  await hc.createLobby();

  await hc.selectGamemode({ gamemode: Gamemode.RANKED_SOLO_DUO });

  await hc.selectRoles({ roles: [Role.MID, Role.TOP] });

  await hc.findMatch({});

  hc.banChampion({ champion: Champion.YUUMI });

  hc.selectChampion({ champions: hc.getPlayerChampions() });
};
main();

import { PlayerInfo } from "./xmpp.client.service";

export function generateRandomDigitsForChat(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generates a random integer from 0 to 9
    result += randomDigit.toString();
  }

  // Check if the first character is "0" and replace it with "1"
  if (result.startsWith("0")) {
    result = "1" + result.substring(1);
  }

  return result;
}

export const BASE_PLAYER_INFO: PlayerInfo = {
  championId: "",
  gameQueueType: "",
  gameStatus: "outOfGame",
  legendaryMasteryScore: "0",
  level: "30",
  mapId: "",
  profileIcon: "907",
  puuid: "49f9f9af-1f50-5427-a386-915b9914e8e2",
  rankedPrevSeasonDivision: "NA",
  rankedPrevSeasonTier: "",
  regalia: { bannerType: 2, crestType: 1, selectedPrestigeCrest: 0 },
  skinVariant: "",
  skinname: "",
};

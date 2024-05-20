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

export function removeRcPart(input: string): string {
  return input.replace(/\/RC-\d+$/, "");
}

export function getFormattedDate(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

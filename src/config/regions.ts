import { Region } from "../enums/region.enum";

type RegionProps = {
  name: string;
  regionUpper: string;
  regionLower: string;
  regionLower2: string;
  rtmpHost: string;
  rtmpPort: number;
  leagueEdgeUrl: string;
  playerPlatformEdgeUrl: string;
  discoverousServiceLocation: string;
  xmppUrl: string;
};

const regions: { [key: string]: RegionProps } = {
  [Region.BR]: {
    name: "Brazil",
    regionUpper: "BR1",
    regionLower: "br1",
    regionLower2: "br1",
    rtmpHost: "feapp.br1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://br-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.br1",
    xmppUrl: "br.chat.si.riotgames.com",
  },
  [Region.EUW]: {
    name: "Europe West",
    regionUpper: "EUW1",
    regionLower: "euw1",
    regionLower2: "eu1",
    rtmpHost: "feapp.euw1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://euw-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.euw1",
    xmppUrl: "euw1.chat.si.riotgames.com",
  },
  [Region.EUNE]: {
    name: "Europe Nordic & East",
    regionUpper: "EUN1",
    regionLower: "eun1",
    regionLower2: "eun1",
    rtmpHost: "prod.eun1.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://eune-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.eun1",
    xmppUrl: "eun1.chat.si.riotgames.com",
  },
  [Region.JP]: {
    name: "Japan",
    regionUpper: "JP1",
    regionLower: "jp1",
    regionLower2: "jp1",
    rtmpHost: "feapp.jp1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://jp-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://apne1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apne1-prod.jp1",
    xmppUrl: "jp1.chat.si.riotgames.com",
  },
  [Region.LA1]: {
    name: "Latin America North",
    regionUpper: "LA1",
    regionLower: "la1",
    regionLower2: "la1",
    rtmpHost: "feapp.la1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://las-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la1",
    xmppUrl: "la1.chat.si.riotgames.com",
  },
  [Region.LA2]: {
    name: "Latin America South",
    regionUpper: "LA2",
    regionLower: "la2",
    regionLower2: "la2",
    rtmpHost: "feapp.la2.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://lan-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la2",
    xmppUrl: "la1.chat.si.riotgames.com",
  },
  [Region.NA]: {
    name: "North America",
    regionUpper: "NA",
    regionLower: "na",
    regionLower2: "na",
    rtmpHost: "feapp.na1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://na-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.na1",
    xmppUrl: "na2.chat.si.riotgames.com",
  },
  [Region.OC1]: {
    name: "Oceania",
    regionUpper: "OC1",
    regionLower: "oc1",
    regionLower2: "oc1",
    rtmpHost: "feapp.oc1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://oce-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apse1-prod.oc1",
    xmppUrl: "oc1.chat.si.riotgames.com",
  },
  [Region.RU]: {
    name: "Russia",
    regionUpper: "RU",
    regionLower: "ru",
    regionLower2: "ru",
    rtmpHost: "feapp.ru.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://ru-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.ru",
    xmppUrl: "ru1.chat.si.riotgames.com",
  },
  [Region.TR]: {
    name: "Turkey",
    regionUpper: "TR",
    regionLower: "tr",
    regionLower2: "tr",
    rtmpHost: "prod.tr.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://tr-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.tr1",
    xmppUrl: "tr1.chat.si.riotgames.com",
  },
};

export const getRegion = (region: Region): RegionProps => {
  return regions[region];
}

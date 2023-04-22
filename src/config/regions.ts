interface Region {
  name: string;
  regionUpper: string;
  regionLower: string;
  rtmpHost: string;
  rtmpPort: number;
  leagueEdgeUrl: string;
  playerPlatformEdgeUrl: string;
  discoverousServiceLocation: string;
}

const regions = {
  BR: {
    name: "Brazil",
    regionUpper: "BR1",
    regionLower: "br1",
    rtmpHost: "feapp.br1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://br-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.br1",
  },
  EUW: {
    name: "Europe West",
    regionUpper: "EUW1",
    regionLower: "euw1",
    rtmpHost: "feapp.euw1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://euw-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.euw1",
  },
  EUNE: {
    name: "Europe Nordic & East",
    regionUpper: "EUN1",
    regionLower: "eun1",
    rtmpHost: "prod.eun1.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://eune-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.eun1",
  },
  JP: {
    name: "Japan",
    regionUpper: "JP1",
    regionLower: "jp1",
    rtmpHost: "feapp.jp1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://jp-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://apne1-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apne1-prod.jp1",
  },
  LA1: {
    name: "Latin America North",
    regionUpper: "LA1",
    regionLower: "la1",
    rtmpHost: "feapp.la1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://las-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la1",
  },
  LA2: {
    name: "Latin America South",
    regionUpper: "LA2",
    regionLower: "la2",
    rtmpHost: "feapp.la2.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://lan-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la2",
  },
  NA: {
    name: "North America",
    regionUpper: "NA",
    regionLower: "na",
    rtmpHost: "feapp.na1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://na-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.na1",
  },
  OC1: {
    name: "Oceania",
    regionUpper: "OC1",
    regionLower: "oc1",
    rtmpHost: "feapp.oc1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://oce-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apse1-prod.oc1",
  },
  RU: {
    name: "Russia",
    regionUpper: "RU",
    regionLower: "ru",
    rtmpHost: "feapp.ru.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://ru-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.ru",
  },
  TR: {
    name: "Turkey",
    regionUpper: "TR",
    regionLower: "tr",
    rtmpHost: "prod.tr.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://tr-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-green.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.tr1",
  },
};

export const REGION: Region = regions[process.env.REGION || "BR"];

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Champion: () => Champion,
  EventCallbackName: () => EventCallbackName,
  Gamemode: () => Gamemode,
  HeadlessClient: () => HeadlessClient,
  Region: () => Region,
  Role: () => Role,
  SummonerSpell: () => SummonerSpell
});
module.exports = __toCommonJS(src_exports);

// src/enums/champion.enum.ts
var Champion = /* @__PURE__ */ ((Champion3) => {
  Champion3[Champion3["NONE"] = -1] = "NONE";
  Champion3[Champion3["ANNIE"] = 1] = "ANNIE";
  Champion3[Champion3["AHRI"] = 103] = "AHRI";
  Champion3[Champion3["AKALI"] = 84] = "AKALI";
  Champion3[Champion3["AKSHAN"] = 166] = "AKSHAN";
  Champion3[Champion3["ALISTAR"] = 12] = "ALISTAR";
  Champion3[Champion3["AMUMU"] = 32] = "AMUMU";
  Champion3[Champion3["ANIVIA"] = 34] = "ANIVIA";
  Champion3[Champion3["APHELIOS"] = 523] = "APHELIOS";
  Champion3[Champion3["ASHE"] = 22] = "ASHE";
  Champion3[Champion3["AURELIONSOL"] = 136] = "AURELIONSOL";
  Champion3[Champion3["AZIR"] = 268] = "AZIR";
  Champion3[Champion3["BARD"] = 432] = "BARD";
  Champion3[Champion3["BELVETH"] = 200] = "BELVETH";
  Champion3[Champion3["BLITZCRANK"] = 53] = "BLITZCRANK";
  Champion3[Champion3["BRAND"] = 63] = "BRAND";
  Champion3[Champion3["BRAUM"] = 201] = "BRAUM";
  Champion3[Champion3["CAITLYN"] = 51] = "CAITLYN";
  Champion3[Champion3["CAMILLE"] = 164] = "CAMILLE";
  Champion3[Champion3["CASSIOPEIA"] = 69] = "CASSIOPEIA";
  Champion3[Champion3["CHOGATH"] = 31] = "CHOGATH";
  Champion3[Champion3["CORKI"] = 42] = "CORKI";
  Champion3[Champion3["DARIUS"] = 122] = "DARIUS";
  Champion3[Champion3["DIANA"] = 131] = "DIANA";
  Champion3[Champion3["DRAVEN"] = 119] = "DRAVEN";
  Champion3[Champion3["DRMUNDO"] = 36] = "DRMUNDO";
  Champion3[Champion3["EKKO"] = 245] = "EKKO";
  Champion3[Champion3["ELISE"] = 60] = "ELISE";
  Champion3[Champion3["EVELYNN"] = 28] = "EVELYNN";
  Champion3[Champion3["EZREAL"] = 81] = "EZREAL";
  Champion3[Champion3["FIDDLESTICKS"] = 9] = "FIDDLESTICKS";
  Champion3[Champion3["FIORA"] = 114] = "FIORA";
  Champion3[Champion3["FIZZ"] = 105] = "FIZZ";
  Champion3[Champion3["GALIO"] = 3] = "GALIO";
  Champion3[Champion3["GANGPLANK"] = 41] = "GANGPLANK";
  Champion3[Champion3["GAREN"] = 86] = "GAREN";
  Champion3[Champion3["GNAR"] = 150] = "GNAR";
  Champion3[Champion3["GRAGAS"] = 79] = "GRAGAS";
  Champion3[Champion3["GRAVES"] = 104] = "GRAVES";
  Champion3[Champion3["GWEN"] = 887] = "GWEN";
  Champion3[Champion3["HECARIM"] = 120] = "HECARIM";
  Champion3[Champion3["HEIMERDINGER"] = 74] = "HEIMERDINGER";
  Champion3[Champion3["ILLAOI"] = 420] = "ILLAOI";
  Champion3[Champion3["IRELIA"] = 39] = "IRELIA";
  Champion3[Champion3["IVERN"] = 427] = "IVERN";
  Champion3[Champion3["JANNA"] = 40] = "JANNA";
  Champion3[Champion3["JARVANIV"] = 59] = "JARVANIV";
  Champion3[Champion3["JAX"] = 24] = "JAX";
  Champion3[Champion3["JAYCE"] = 126] = "JAYCE";
  Champion3[Champion3["JHIN"] = 202] = "JHIN";
  Champion3[Champion3["JINX"] = 222] = "JINX";
  Champion3[Champion3["KAISA"] = 145] = "KAISA";
  Champion3[Champion3["KALISTA"] = 429] = "KALISTA";
  Champion3[Champion3["KARMA"] = 43] = "KARMA";
  Champion3[Champion3["KARTHUS"] = 30] = "KARTHUS";
  Champion3[Champion3["KASSADIN"] = 38] = "KASSADIN";
  Champion3[Champion3["KATARINA"] = 55] = "KATARINA";
  Champion3[Champion3["KAYLE"] = 10] = "KAYLE";
  Champion3[Champion3["KAYN"] = 141] = "KAYN";
  Champion3[Champion3["KENNEN"] = 85] = "KENNEN";
  Champion3[Champion3["KHAZIX"] = 121] = "KHAZIX";
  Champion3[Champion3["KINDRED"] = 203] = "KINDRED";
  Champion3[Champion3["KLED"] = 240] = "KLED";
  Champion3[Champion3["KOGMAW"] = 96] = "KOGMAW";
  Champion3[Champion3["KSANTE"] = 897] = "KSANTE";
  Champion3[Champion3["LEBLANC"] = 7] = "LEBLANC";
  Champion3[Champion3["LEESIN"] = 64] = "LEESIN";
  Champion3[Champion3["LEONA"] = 89] = "LEONA";
  Champion3[Champion3["LILLIA"] = 876] = "LILLIA";
  Champion3[Champion3["LISSANDRA"] = 127] = "LISSANDRA";
  Champion3[Champion3["LUCIAN"] = 236] = "LUCIAN";
  Champion3[Champion3["LULU"] = 117] = "LULU";
  Champion3[Champion3["LUX"] = 99] = "LUX";
  Champion3[Champion3["MALPHITE"] = 54] = "MALPHITE";
  Champion3[Champion3["MALZAHAR"] = 90] = "MALZAHAR";
  Champion3[Champion3["MAOKAI"] = 57] = "MAOKAI";
  Champion3[Champion3["MASTERYI"] = 11] = "MASTERYI";
  Champion3[Champion3["MISSFORTUNE"] = 21] = "MISSFORTUNE";
  Champion3[Champion3["MONKEYKING"] = 62] = "MONKEYKING";
  Champion3[Champion3["MORDEKAISER"] = 82] = "MORDEKAISER";
  Champion3[Champion3["MORGANA"] = 25] = "MORGANA";
  Champion3[Champion3["NAMI"] = 267] = "NAMI";
  Champion3[Champion3["NASUS"] = 75] = "NASUS";
  Champion3[Champion3["NAUTILUS"] = 111] = "NAUTILUS";
  Champion3[Champion3["NEEKO"] = 518] = "NEEKO";
  Champion3[Champion3["NIDALEE"] = 76] = "NIDALEE";
  Champion3[Champion3["NILAH"] = 895] = "NILAH";
  Champion3[Champion3["NOCTURNE"] = 56] = "NOCTURNE";
  Champion3[Champion3["NUNU"] = 20] = "NUNU";
  Champion3[Champion3["OLAF"] = 2] = "OLAF";
  Champion3[Champion3["ORIANNA"] = 61] = "ORIANNA";
  Champion3[Champion3["ORNN"] = 516] = "ORNN";
  Champion3[Champion3["PANTHEON"] = 80] = "PANTHEON";
  Champion3[Champion3["POPPY"] = 78] = "POPPY";
  Champion3[Champion3["PYKE"] = 555] = "PYKE";
  Champion3[Champion3["QIYANA"] = 246] = "QIYANA";
  Champion3[Champion3["QUINN"] = 133] = "QUINN";
  Champion3[Champion3["RAKAN"] = 497] = "RAKAN";
  Champion3[Champion3["RAMMUS"] = 33] = "RAMMUS";
  Champion3[Champion3["REKSAI"] = 421] = "REKSAI";
  Champion3[Champion3["RELL"] = 526] = "RELL";
  Champion3[Champion3["RENATAGLASC"] = 888] = "RENATAGLASC";
  Champion3[Champion3["RENEKTON"] = 58] = "RENEKTON";
  Champion3[Champion3["RENGAR"] = 107] = "RENGAR";
  Champion3[Champion3["RIVEN"] = 92] = "RIVEN";
  Champion3[Champion3["RUMBLE"] = 68] = "RUMBLE";
  Champion3[Champion3["RYZE"] = 13] = "RYZE";
  Champion3[Champion3["SAMIRA"] = 360] = "SAMIRA";
  Champion3[Champion3["SEJUANI"] = 113] = "SEJUANI";
  Champion3[Champion3["SENNA"] = 235] = "SENNA";
  Champion3[Champion3["SERAPHINE"] = 147] = "SERAPHINE";
  Champion3[Champion3["SETT"] = 875] = "SETT";
  Champion3[Champion3["SHACO"] = 35] = "SHACO";
  Champion3[Champion3["SHEN"] = 98] = "SHEN";
  Champion3[Champion3["SHYVANA"] = 102] = "SHYVANA";
  Champion3[Champion3["SINGED"] = 27] = "SINGED";
  Champion3[Champion3["SION"] = 14] = "SION";
  Champion3[Champion3["SIVIR"] = 15] = "SIVIR";
  Champion3[Champion3["SKARNER"] = 72] = "SKARNER";
  Champion3[Champion3["SONA"] = 37] = "SONA";
  Champion3[Champion3["SORAKA"] = 16] = "SORAKA";
  Champion3[Champion3["SWAIN"] = 50] = "SWAIN";
  Champion3[Champion3["SYLAS"] = 517] = "SYLAS";
  Champion3[Champion3["SYNDRA"] = 134] = "SYNDRA";
  Champion3[Champion3["TAHMKENCH"] = 223] = "TAHMKENCH";
  Champion3[Champion3["TALIYAH"] = 163] = "TALIYAH";
  Champion3[Champion3["TALON"] = 91] = "TALON";
  Champion3[Champion3["TARIC"] = 44] = "TARIC";
  Champion3[Champion3["TEEMO"] = 17] = "TEEMO";
  Champion3[Champion3["THRESH"] = 412] = "THRESH";
  Champion3[Champion3["TRISTANA"] = 18] = "TRISTANA";
  Champion3[Champion3["TRUNDLE"] = 48] = "TRUNDLE";
  Champion3[Champion3["TRYNDAMERE"] = 23] = "TRYNDAMERE";
  Champion3[Champion3["TWISTEDFATE"] = 4] = "TWISTEDFATE";
  Champion3[Champion3["TWITCH"] = 29] = "TWITCH";
  Champion3[Champion3["UDYR"] = 77] = "UDYR";
  Champion3[Champion3["URGOT"] = 6] = "URGOT";
  Champion3[Champion3["VARUS"] = 110] = "VARUS";
  Champion3[Champion3["VAYNE"] = 67] = "VAYNE";
  Champion3[Champion3["VEIGAR"] = 45] = "VEIGAR";
  Champion3[Champion3["VELKOZ"] = 161] = "VELKOZ";
  Champion3[Champion3["VEX"] = 711] = "VEX";
  Champion3[Champion3["VI"] = 254] = "VI";
  Champion3[Champion3["VIEGO"] = 234] = "VIEGO";
  Champion3[Champion3["VIKTOR"] = 112] = "VIKTOR";
  Champion3[Champion3["VLADIMIR"] = 8] = "VLADIMIR";
  Champion3[Champion3["VOLIBEAR"] = 106] = "VOLIBEAR";
  Champion3[Champion3["WARWICK"] = 19] = "WARWICK";
  Champion3[Champion3["XAYAH"] = 498] = "XAYAH";
  Champion3[Champion3["XERATH"] = 101] = "XERATH";
  Champion3[Champion3["XINZHAO"] = 5] = "XINZHAO";
  Champion3[Champion3["YASUO"] = 157] = "YASUO";
  Champion3[Champion3["YONE"] = 777] = "YONE";
  Champion3[Champion3["YORICK"] = 83] = "YORICK";
  Champion3[Champion3["YUUMI"] = 350] = "YUUMI";
  Champion3[Champion3["ZAC"] = 154] = "ZAC";
  Champion3[Champion3["ZED"] = 238] = "ZED";
  Champion3[Champion3["ZERI"] = 221] = "ZERI";
  Champion3[Champion3["ZIGGS"] = 115] = "ZIGGS";
  Champion3[Champion3["ZILEAN"] = 26] = "ZILEAN";
  Champion3[Champion3["ZOE"] = 142] = "ZOE";
  Champion3[Champion3["ZYRA"] = 143] = "ZYRA";
  return Champion3;
})(Champion || {});
var ChampionName = {
  [-1 /* NONE */]: "None",
  [1 /* ANNIE */]: "Annie",
  [103 /* AHRI */]: "Ahri",
  [84 /* AKALI */]: "Akali",
  [166 /* AKSHAN */]: "Akshan",
  [12 /* ALISTAR */]: "Alistar",
  [32 /* AMUMU */]: "Amumu",
  [34 /* ANIVIA */]: "Anivia",
  [523 /* APHELIOS */]: "Aphelios",
  [22 /* ASHE */]: "Ashe",
  [136 /* AURELIONSOL */]: "Aurelion Sol",
  [268 /* AZIR */]: "Azir",
  [432 /* BARD */]: "Bard",
  [200 /* BELVETH */]: "Belveth",
  [53 /* BLITZCRANK */]: "Blitzcrank",
  [63 /* BRAND */]: "Brand",
  [201 /* BRAUM */]: "Braum",
  [51 /* CAITLYN */]: "Caitlyn",
  [164 /* CAMILLE */]: "Camille",
  [69 /* CASSIOPEIA */]: "Cassiopeia",
  [31 /* CHOGATH */]: "Cho'Gath",
  [42 /* CORKI */]: "Corki",
  [122 /* DARIUS */]: "Darius",
  [131 /* DIANA */]: "Diana",
  [119 /* DRAVEN */]: "Draven",
  [36 /* DRMUNDO */]: "Dr. Mundo",
  [245 /* EKKO */]: "Ekko",
  [60 /* ELISE */]: "Elise",
  [28 /* EVELYNN */]: "Evelynn",
  [81 /* EZREAL */]: "Ezreal",
  [9 /* FIDDLESTICKS */]: "Fiddlesticks",
  [114 /* FIORA */]: "Fiora",
  [105 /* FIZZ */]: "Fizz",
  [3 /* GALIO */]: "Galio",
  [41 /* GANGPLANK */]: "Gangplank",
  [86 /* GAREN */]: "Garen",
  [150 /* GNAR */]: "Gnar",
  [79 /* GRAGAS */]: "Gragas",
  [104 /* GRAVES */]: "Graves",
  [887 /* GWEN */]: "Gwen",
  [120 /* HECARIM */]: "Hecarim",
  [74 /* HEIMERDINGER */]: "Heimerdinger",
  [420 /* ILLAOI */]: "Illaoi",
  [39 /* IRELIA */]: "Irelia",
  [427 /* IVERN */]: "Ivern",
  [40 /* JANNA */]: "Janna",
  [59 /* JARVANIV */]: "Jarvan IV",
  [24 /* JAX */]: "Jax",
  [126 /* JAYCE */]: "Jayce",
  [202 /* JHIN */]: "Jhin",
  [222 /* JINX */]: "Jinx",
  [145 /* KAISA */]: "Kai'Sa",
  [429 /* KALISTA */]: "Kalista",
  [43 /* KARMA */]: "Karma",
  [30 /* KARTHUS */]: "Karthus",
  [38 /* KASSADIN */]: "Kassadin",
  [55 /* KATARINA */]: "Katarina",
  [10 /* KAYLE */]: "Kayle",
  [141 /* KAYN */]: "Kayn",
  [85 /* KENNEN */]: "Kennen",
  [121 /* KHAZIX */]: "Kha'Zix",
  [203 /* KINDRED */]: "Kindred",
  [240 /* KLED */]: "Kled",
  [96 /* KOGMAW */]: "Kog'Maw",
  [897 /* KSANTE */]: "K-Sante",
  [7 /* LEBLANC */]: "LeBlanc",
  [64 /* LEESIN */]: "Lee Sin",
  [89 /* LEONA */]: "Leona",
  [876 /* LILLIA */]: "Lillia",
  [127 /* LISSANDRA */]: "Lissandra",
  [236 /* LUCIAN */]: "Lucian",
  [117 /* LULU */]: "Lulu",
  [99 /* LUX */]: "Lux",
  [54 /* MALPHITE */]: "Malphite",
  [90 /* MALZAHAR */]: "Malzahar",
  [57 /* MAOKAI */]: "Maokai",
  [11 /* MASTERYI */]: "Master Yi",
  [21 /* MISSFORTUNE */]: "Miss Fortune",
  [62 /* MONKEYKING */]: "Wukong",
  [82 /* MORDEKAISER */]: "Mordekaiser",
  [25 /* MORGANA */]: "Morgana",
  [267 /* NAMI */]: "Nami",
  [75 /* NASUS */]: "Nasus",
  [111 /* NAUTILUS */]: "Nautilus",
  [518 /* NEEKO */]: "Neeko",
  [76 /* NIDALEE */]: "Nidalee",
  [895 /* NILAH */]: "Nilah",
  [56 /* NOCTURNE */]: "Nocturne",
  [20 /* NUNU */]: "Nunu & Willump",
  [2 /* OLAF */]: "Olaf",
  [61 /* ORIANNA */]: "Orianna",
  [516 /* ORNN */]: "Ornn",
  [80 /* PANTHEON */]: "Pantheon",
  [78 /* POPPY */]: "Poppy",
  [555 /* PYKE */]: "Pyke",
  [246 /* QIYANA */]: "Qiyana",
  [133 /* QUINN */]: "Quinn",
  [497 /* RAKAN */]: "Rakan",
  [33 /* RAMMUS */]: "Rammus",
  [421 /* REKSAI */]: "Rek'Sai",
  [526 /* RELL */]: "Rell",
  [888 /* RENATAGLASC */]: "Renekton",
  [58 /* RENEKTON */]: "Renekton",
  [107 /* RENGAR */]: "Rengar",
  [92 /* RIVEN */]: "Riven",
  [68 /* RUMBLE */]: "Rumble",
  [13 /* RYZE */]: "Ryze",
  [360 /* SAMIRA */]: "Samira",
  [113 /* SEJUANI */]: "Sejuani",
  [235 /* SENNA */]: "Senna",
  [147 /* SERAPHINE */]: "Seraphine",
  [875 /* SETT */]: "Sett",
  [35 /* SHACO */]: "Shaco",
  [98 /* SHEN */]: "Shen",
  [102 /* SHYVANA */]: "Shyvana",
  [27 /* SINGED */]: "Singed",
  [14 /* SION */]: "Sion",
  [15 /* SIVIR */]: "Sivir",
  [72 /* SKARNER */]: "Skarner",
  [37 /* SONA */]: "Sona",
  [16 /* SORAKA */]: "Soraka",
  [50 /* SWAIN */]: "Swain",
  [517 /* SYLAS */]: "Sylas",
  [134 /* SYNDRA */]: "Syndra",
  [223 /* TAHMKENCH */]: "Tahm Kench",
  [163 /* TALIYAH */]: "Taliyah",
  [91 /* TALON */]: "Talon",
  [44 /* TARIC */]: "Taric",
  [17 /* TEEMO */]: "Teemo",
  [412 /* THRESH */]: "Thresh",
  [18 /* TRISTANA */]: "Tristana",
  [48 /* TRUNDLE */]: "Trundle",
  [23 /* TRYNDAMERE */]: "Tryndamere",
  [4 /* TWISTEDFATE */]: "Twisted Fate",
  [29 /* TWITCH */]: "Twitch",
  [77 /* UDYR */]: "Udyr",
  [6 /* URGOT */]: "Urgot",
  [110 /* VARUS */]: "Varus",
  [67 /* VAYNE */]: "Vayne",
  [45 /* VEIGAR */]: "Veigar",
  [161 /* VELKOZ */]: "Vel'Koz",
  [711 /* VEX */]: "Vex",
  [254 /* VI */]: "Vi",
  [234 /* VIEGO */]: "Viego",
  [112 /* VIKTOR */]: "Viktor",
  [8 /* VLADIMIR */]: "Vladimir",
  [106 /* VOLIBEAR */]: "Volibear",
  [19 /* WARWICK */]: "Warwick",
  [498 /* XAYAH */]: "Xayah",
  [101 /* XERATH */]: "Xerath",
  [5 /* XINZHAO */]: "Xin Zhao",
  [157 /* YASUO */]: "Yasuo",
  [777 /* YONE */]: "Yone",
  [83 /* YORICK */]: "Yorick",
  [350 /* YUUMI */]: "Yuumi",
  [154 /* ZAC */]: "Zac",
  [238 /* ZED */]: "Zed",
  [221 /* ZERI */]: "Zeri",
  [115 /* ZIGGS */]: "Ziggs",
  [26 /* ZILEAN */]: "Zilean",
  [142 /* ZOE */]: "Zoe",
  [143 /* ZYRA */]: "Zyra"
};

// src/enums/gamemode.enum.ts
var Gamemode = /* @__PURE__ */ ((Gamemode2) => {
  Gamemode2[Gamemode2["DRAFT_PICK"] = 400] = "DRAFT_PICK";
  Gamemode2[Gamemode2["RANKED_SOLO_DUO"] = 420] = "RANKED_SOLO_DUO";
  Gamemode2[Gamemode2["BLIND_PICK"] = 430] = "BLIND_PICK";
  Gamemode2[Gamemode2["TFT_NORMAL"] = 1090] = "TFT_NORMAL";
  Gamemode2[Gamemode2["ARAM"] = 450] = "ARAM";
  return Gamemode2;
})(Gamemode || {});

// src/enums/region.enum.ts
var Region = /* @__PURE__ */ ((Region2) => {
  Region2["BR"] = "BR";
  Region2["EUW"] = "EUW";
  Region2["EUNE"] = "EUNE";
  Region2["JP"] = "JP";
  Region2["LA1"] = "LA1";
  Region2["LA2"] = "LA2";
  Region2["NA"] = "NA";
  Region2["OC1"] = "OC1";
  Region2["RU"] = "RU";
  Region2["TR"] = "TR";
  return Region2;
})(Region || {});

// src/enums/role.enum.ts
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["FILL"] = "FILL";
  Role2["TOP"] = "TOP";
  Role2["JUNGLE"] = "JUNGLE";
  Role2["MID"] = "MIDDLE";
  Role2["ADC"] = "BOTTOM";
  Role2["SUPPORT"] = "UTILITY";
  Role2["UNSELECTED"] = "UNSELECTED";
  return Role2;
})(Role || {});

// src/enums/event-callback-name.enum.ts
var EventCallbackName = /* @__PURE__ */ ((EventCallbackName2) => {
  EventCallbackName2["VIRTUAL_CLIENT_RIOT_TOKEN"] = "VIRTUAL_CLIENT_RIOT_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_LOL_TOKEN"] = "VIRTUAL_CLIENT_LOL_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_PARTY_TOKEN"] = "VIRTUAL_CLIENT_PARTY_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_LOBBY_UNREGISTERED"] = "VIRTUAL_CLIENT_LOBBY_UNREGISTERED";
  EventCallbackName2["VIRTUAL_CLIENT_LOBBY_CREATED"] = "VIRTUAL_CLIENT_LOBBY_CREATED";
  EventCallbackName2["VIRTUAL_CLIENT_SELECT_GAMEMODE"] = "VIRTUAL_CLIENT_SELECT_GAMEMODE";
  EventCallbackName2["VIRTUAL_CLIENT_ROLES_SELECTED"] = "VIRTUAL_CLIENT_ROLES_SELECTED";
  EventCallbackName2["VIRTUAL_CLIENT_FINDING_MATCH"] = "VIRTUAL_CLIENT_FINDING_MATCH";
  EventCallbackName2["VIRTUAL_CLIENT_MATCH_RESTRICTED"] = "VIRTUAL_CLIENT_MATCH_RESTRICTED";
  EventCallbackName2["VIRTUAL_CLIENT_MATCH_ACCEPTED"] = "VIRTUAL_CLIENT_MATCH_ACCEPTED";
  EventCallbackName2["VIRTUAL_CLIENT_USER_INFO_TOKEN"] = "VIRTUAL_CLIENT_USER_INFO_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_GAME_VERSION"] = "VIRTUAL_CLIENT_GAME_VERSION";
  EventCallbackName2["VIRTUAL_CLIENT_CLIENT_VERSION"] = "VIRTUAL_CLIENT_CLIENT_VERSION";
  EventCallbackName2["VIRTUAL_CLIENT_ENTITLEMENT_TOKEN"] = "VIRTUAL_CLIENT_ENTITLEMENT_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_QUEUE_TOKEN"] = "VIRTUAL_CLIENT_QUEUE_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_SESSION_TOKEN"] = "VIRTUAL_CLIENT_SESSION_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_GEOPASS_TOKEN"] = "VIRTUAL_CLIENT_GEOPASS_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_USER_DATA_TOKEN"] = "VIRTUAL_CLIENT_USER_DATA_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_INVENTORY_TOKEN"] = "VIRTUAL_CLIENT_INVENTORY_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN"] = "VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN";
  EventCallbackName2["VIRTUAL_CLIENT_SIPT_TOKEN"] = "VIRTUAL_CLIENT_SIPT_TOKEN";
  EventCallbackName2["RTMP_TLS_CONNECTED"] = "RTMP_TLS_CONNECTED";
  EventCallbackName2["RTMP_HANDSHAKE_DONE"] = "RTMP_HANDSHAKE_DONE";
  EventCallbackName2["RTMP_HEARTBEAT"] = "RTMP_HEARTBEAT";
  EventCallbackName2["RTMP_DSID"] = "RTMP_DSID";
  EventCallbackName2["RTMP_GAME_STARTED"] = "RTMP_GAME_STARTED";
  EventCallbackName2["RTMP_BANNED_CHAMPTION"] = "RTMP_BANNED_CHAMPTION";
  EventCallbackName2["RTMP_PICKED_CHAMPTION"] = "RTMP_PICKED_CHAMPTION";
  EventCallbackName2["RTMP_MY_TURN_TO_PICK_CHAMPTION"] = "RTMP_MY_TURN_TO_PICK_CHAMPTION";
  EventCallbackName2["XMPP_CONNECTED"] = "XMPP_CONNECTED";
  EventCallbackName2["XMPP_HEARTBEAT"] = "XMPP_HEARTBEAT";
  EventCallbackName2["XMPP_DISCONNECTED"] = "XMPP_DISCONNECTED";
  EventCallbackName2["XMPP_RECEIVED_RAW"] = "XMPP_RECEIVED_RAW";
  EventCallbackName2["XMPP_SENT_RAW"] = "XMPP_SENT_RAW";
  EventCallbackName2["XMPP_CHAT_RECEIVED"] = "XMPP_CHAT_RECEIVED";
  EventCallbackName2["XMPP_CHAT_HISTORY_UPDATED"] = "XMPP_CHAT_HISTORY_UPDATED";
  EventCallbackName2["XMPP_FRIENDLIST_UPDATED"] = "XMPP_FRIENDLIST_UPDATED";
  EventCallbackName2["XMPP_PENDING_FRIENDS_UPDATED"] = "XMPP_PENDING_FRIENDS_UPDATED";
  EventCallbackName2["XMPP_MY_JID_UPDATE"] = "XMPP_MY_JID_UPDATE";
  EventCallbackName2["XMPP_CHAT_LAST_READ_UPDATED"] = "XMPP_CHAT_LAST_READ_UPDATED";
  return EventCallbackName2;
})(EventCallbackName || {});

// src/main.ts
var dotenv = __toESM(require("dotenv"));

// src/helpers/version.helper.ts
var VersionHelper = class {
  static get version() {
    return "63.0.9.4909983.4789131";
  }
  static get versionDll() {
    return "24.4.1.3343";
  }
};

// src/suppliers/cookie.supplier.ts
var import_uuid = require("uuid");
var import_base64url = __toESM(require("base64url"));

// src/utils/logger.util.ts
var Logger = class {
  static show() {
    return process.env?.LOL_HEADLESS_CLIENT_ENABLE_LOGS === "true";
  }
  static default(message) {
    this.show() && console.log(message);
  }
  static black(message) {
    this.show() && console.log("\x1B[30m" /* FG_BLACK */, message, "\x1B[0m" /* RESET */);
  }
  static red(message) {
    this.show() && console.log("\x1B[31m" /* FG_RED */, message, "\x1B[0m" /* RESET */);
  }
  static green(message) {
    this.show() && console.log("\x1B[32m" /* FG_GREEN */, message, "\x1B[0m" /* RESET */);
  }
  static yellow(message) {
    this.show() && console.log("\x1B[33m" /* FG_YELLOW */, message, "\x1B[0m" /* RESET */);
  }
  static blue(message) {
    this.show() && console.log("\x1B[34m" /* FG_BLUE */, message, "\x1B[0m" /* RESET */);
  }
  static magenta(message) {
    this.show() && console.log("\x1B[35m" /* FG_MAGENTA */, message, "\x1B[0m" /* RESET */);
  }
  static cyan(message) {
    this.show() && console.log("\x1B[36m" /* FG_CYAN */, message, "\x1B[0m" /* RESET */);
  }
  static white(message) {
    this.show() && console.log("\x1B[37m" /* FG_WHITE */, message, "\x1B[0m" /* RESET */);
  }
};

// src/suppliers/cookie.supplier.ts
var CookieSupplier = class {
  constructor(apiRequest, cookieType = "CLIENT") {
    this.apiRequest = apiRequest;
    this.URL = "https://auth.riotgames.com/api/v1/authorization";
    this._additionalCookie = null;
    this._cookieType = "CLIENT";
    this.apiRequest = apiRequest;
    this._cookieType = cookieType;
  }
  async makeRequest({
    method = "POST",
    body = this.body
  }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      body
    });
    return response;
  }
  get headers() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Pragma: "no-cache",
      "User-Agent": `RiotClient/${VersionHelper.version} rso-auth (Windows;10;;Professional, x64)`
    };
    if (this._additionalCookie) {
      headers["Cookie"] = this._additionalCookie;
    }
    return headers;
  }
  get body() {
    return JSON.stringify({
      acr_values: "",
      claims: "",
      response_type: "token id_token",
      code_challenge_method: "",
      redirect_uri: "http://localhost/redirect",
      nonce: this.generateNonce(),
      code_challenge: "",
      client_id: this.cookieType === "CLIENT" ? "riot-client" : "lol",
      scope: this.cookieType === "CLIENT" ? "openid link ban lol_region lol summoner offline_access" : "lol_region account openid ban lol summoner offline_access"
    });
  }
  set additionalCookie(value) {
    this._additionalCookie = value;
  }
  set cookieType(value) {
    this._cookieType = value;
  }
  generateNonce() {
    return import_base64url.default.encode((0, import_uuid.v4)(), "utf8").substring(0, 22);
  }
  build(arr) {
    if (arr == null || arr.length === 0)
      return null;
    const builder = [];
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i].split(";");
      builder.push(data[0].trim());
    }
    const result = builder.join("; ") + ";";
    return result;
  }
  getCfbm(arr) {
    const cfBmElement = arr.find((str) => str.startsWith("__cf_bm"));
    if (!cfBmElement) {
      Logger.red("[CFBM COOKIE] Not found");
      return "";
    }
    const cfBmString = cfBmElement.slice(
      cfBmElement.indexOf("__cf_bm"),
      cfBmElement.indexOf(";", cfBmElement.indexOf("__cf_bm"))
    );
    return cfBmString;
  }
};

// src/suppliers/entitlement.supplier.ts
var EntitlementSupplier = class {
  constructor(apiRequest, jwt) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.URL = "https://entitlements.auth.riotgames.com/api/token/v1";
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      body: JSON.stringify({ urn: "urn:entitlement:%" })
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `RiotGamesApi/${VersionHelper.versionDll} entitlements (Windows;10;;Home Single Language, x64) riot_client/0`
    };
    return headers;
  }
};

// src/suppliers/geopas.supplier.ts
var GeopasSupplier = class {
  constructor(apiRequest, jwt) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.URL = "https://riot-geo.pas.si.riotgames.com/pas/v1/service/chat";
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`
    };
    return headers;
  }
};

// src/modules/query-token.parser.ts
var QueryTokenParser = class {
  static parse(plainText) {
    const splittedArray = plainText.split("#")[1].split("&");
    const map = {};
    for (const splitted of splittedArray) {
      const pair = splitted.split("=");
      if (pair.length !== 2)
        continue;
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      map[key] = value;
    }
    return map;
  }
};

// src/config/regions.ts
var regions = {
  ["BR" /* BR */]: {
    name: "Brazil",
    regionUpper: "BR1",
    regionLower: "br1",
    rtmpHost: "feapp.br1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://br-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.br1",
    xmppUrl: "br.chat.si.riotgames.com"
  },
  ["EUW" /* EUW */]: {
    name: "Europe West",
    regionUpper: "EUW1",
    regionLower: "euw1",
    rtmpHost: "feapp.euw1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://euw-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.euw1",
    xmppUrl: "euw1.chat.si.riotgames.com"
  },
  ["EUNE" /* EUNE */]: {
    name: "Europe Nordic & East",
    regionUpper: "EUN1",
    regionLower: "eun1",
    rtmpHost: "prod.eun1.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://eune-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.eun1",
    xmppUrl: "eun1.chat.si.riotgames.com"
  },
  ["JP" /* JP */]: {
    name: "Japan",
    regionUpper: "JP1",
    regionLower: "jp1",
    rtmpHost: "feapp.jp1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://jp-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://apne1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apne1-prod.jp1",
    xmppUrl: "jp1.chat.si.riotgames.com"
  },
  ["LA1" /* LA1 */]: {
    name: "Latin America North",
    regionUpper: "LA1",
    regionLower: "la1",
    rtmpHost: "feapp.la1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://las-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la1",
    xmppUrl: "la1.chat.si.riotgames.com"
  },
  ["LA2" /* LA2 */]: {
    name: "Latin America South",
    regionUpper: "LA2",
    regionLower: "la2",
    rtmpHost: "feapp.la2.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://lan-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.la2",
    xmppUrl: "la1.chat.si.riotgames.com"
  },
  ["NA" /* NA */]: {
    name: "North America",
    regionUpper: "NA",
    regionLower: "na",
    rtmpHost: "feapp.na1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://na-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-usw2-prod.na1",
    xmppUrl: "na2.chat.si.riotgames.com"
  },
  ["OC1" /* OC1 */]: {
    name: "Oceania",
    regionUpper: "OC1",
    regionLower: "oc1",
    rtmpHost: "feapp.oc1.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://oce-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://usw2-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-apse1-prod.oc1",
    xmppUrl: "oc1.chat.si.riotgames.com"
  },
  ["RU" /* RU */]: {
    name: "Russia",
    regionUpper: "RU",
    regionLower: "ru",
    rtmpHost: "feapp.ru.lol.pvp.net",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://ru-red.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.aws-euc1-prod.ru",
    xmppUrl: "ru1.chat.si.riotgames.com"
  },
  ["TR" /* TR */]: {
    name: "Turkey",
    regionUpper: "TR",
    regionLower: "tr",
    rtmpHost: "prod.tr.lol.riotgames.com",
    rtmpPort: 2099,
    leagueEdgeUrl: "https://tr-blue.lol.sgp.pvp.net",
    playerPlatformEdgeUrl: "https://euc1-red.pp.sgp.pvp.net",
    discoverousServiceLocation: "lolriot.euc1.tr1",
    xmppUrl: "tr1.chat.si.riotgames.com"
  }
};
var getRegion = (region) => {
  return regions[region];
};

// src/suppliers/queue.supplier.ts
var QueueSupplier = class {
  constructor(apiRequest, jwt, entitlementJwt, userInfoJwt, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.entitlementJwt = entitlementJwt;
    this.userInfoJwt = userInfoJwt;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).playerPlatformEdgeUrl}/login-queue/v2/login/products/lol/regions/${getRegion(this.region).regionLower}`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-login)`
    };
    return headers;
  }
  get body() {
    const body = {
      clientName: "lcu",
      entitlements: this.entitlementJwt,
      userinfo: this.userInfoJwt
    };
    return body;
  }
};

// src/modules/riot-client.ts
var RiotClientUser = class {
  constructor(jwt) {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedJwt = JSON.parse(atob(base64));
    this.sub = decodedJwt.sub;
    const data = decodedJwt.dat;
    this._dataUserId = data.hasOwnProperty("u") ? data.u : 0;
    this._dataRegion = data.hasOwnProperty("r") ? data.r : null;
  }
  getSub() {
    return this.sub;
  }
  get dataRegion() {
    return this._dataRegion;
  }
  get dataUserId() {
    return this._dataUserId;
  }
  isLeagueAccountAssociated() {
    return this._dataUserId !== 0 && this.dataRegion !== null;
  }
  toString() {
    return `RiotClientUser{sub='${this.sub}', dataRegion='${this.dataRegion}', dataUserId=${this.dataUserId}}`;
  }
};

// src/suppliers/session-refresh.supplier.ts
var SessionRefreshSupplier = class {
  constructor(apiRequest, jwt, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).playerPlatformEdgeUrl}/session-external/v1/session/refresh`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-league-session)`
    };
    return headers;
  }
  get body() {
    const body = { lst: this.jwt };
    return body;
  }
};

// src/suppliers/session.supplier.ts
var SessionSupplier = class {
  constructor(apiRequest, jwt, puuid, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).playerPlatformEdgeUrl}/session-external/v1/session/create`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-login)`
    };
    return headers;
  }
  get body() {
    const body = {
      product: "lol",
      claims: { cname: "lcu" },
      puuid: this.puuid,
      region: getRegion(this.region).regionLower
    };
    return body;
  }
};

// src/services/http/api-request.ts
var import_axios = __toESM(require("axios"));
var https = __toESM(require("https"));
var ApiRequest = class {
  constructor(userAgent = "RiotClient/63.0.9.4909983.4789131 %s (Windows;10;;Professional, x64)") {
    this.userAgent = userAgent;
    this.ciphers = "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384";
    const agentOptions = {
      ciphers: this.ciphers,
      maxVersion: "TLSv1.3",
      minVersion: "TLSv1.2",
      keepAlive: true
    };
    this.agent = new https.Agent(agentOptions);
  }
  async request({
    url,
    method = "GET",
    headers = {},
    body,
    params
  }) {
    try {
      const config2 = {
        method,
        url,
        headers: { "User-Agent": this.userAgent, ...headers },
        timeout: 6e5,
        //optional
        data: body,
        proxy: false,
        httpAgent: this.agent,
        httpsAgent: this.agent,
        params
      };
      const response = await (0, import_axios.default)(config2);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

// src/suppliers/user-info.supplier.ts
var UserInfoSupplier = class {
  constructor(apiRequest, jwt) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.URL = "https://auth.riotgames.com/userinfo";
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      "User-Agent": `RiotClient/${VersionHelper.version} rso-auth (Windows;10;;Professional, x64)`
    };
    return headers;
  }
};

// src/suppliers/party.supplier.ts
var PartySupplier = class {
  constructor(apiRequest, jwt, puuid, accountId, id, inventoryToken, partyUserToken, userInfoJwt, region, gameVersion, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.accountId = accountId;
    this.id = id;
    this.inventoryToken = inventoryToken;
    this.partyUserToken = partyUserToken;
    this.userInfoJwt = userInfoJwt;
    this.region = region;
    this.gameVersion = gameVersion;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/players`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "PUT" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}`,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
  get body() {
    const body = {
      accountId: this.accountId,
      createdAt: 0,
      currentParty: null,
      eligibilityHash: 0,
      parties: null,
      platformId: getRegion(this.region).regionUpper,
      puuid: this.puuid,
      registration: {
        experiments: {},
        gameClientVersion: this.gameVersion,
        inventoryToken: null,
        inventoryTokens: [""],
        playerTokens: {
          idToken: "",
          summonerToken: this.partyUserToken,
          userInfoToken: this.userInfoJwt
        },
        rankedOverviewToken: "",
        simpleInventoryToken: this.inventoryToken,
        summonerToken: null
      },
      serverUtcMillis: 0,
      summonerId: this.id,
      tftGamesPlayed: 0,
      tftGamesWon: 0,
      version: 0
    };
    return body;
  }
};

// src/suppliers/user-data.supplier.ts
var UserDataSupplier = class {
  constructor(apiRequest, jwt, puuid, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = ``;
    this.apiRequest = apiRequest;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/summoner-ledge/v1/regions/${getRegion(this.region).regionUpper}/summoners/puuid`;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/jwt`,
      method,
      headers: this.headers
    });
    const tokenParts = response.data.split(".");
    const decodedPayload = Buffer.from(tokenParts[1], "base64").toString(
      "utf8"
    );
    const payload = JSON.parse(decodedPayload);
    return payload;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-summoner)`
    };
    return headers;
  }
};

// src/suppliers/gamemode.supplier.ts
var GamemodeSupplier = class {
  constructor(apiRequest, jwt, partyId, gamemode, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.partyId = partyId;
    this.gamemode = gamemode;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/parties`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "PUT" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/gamemode`,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
  get body() {
    const body = {
      allowSpectators: null,
      botDifficulty: null,
      customsSettings: null,
      gameCustomization: {},
      gameType: "",
      gameTypeConfigId: null,
      mapId: null,
      maxPartySize: 5,
      maxTeamSize: 0,
      queueId: this.gamemode
    };
    return body;
  }
};

// src/suppliers/role.supplier.ts
var RoleSupplier = class {
  constructor(apiRequest, jwt, partyId, puuid, roles, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.partyId = partyId;
    this.puuid = puuid;
    this.roles = roles;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/parties`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "PUT" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/members/${this.puuid}/metadata`,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
  get body() {
    const body = {
      championSelection: null,
      playerSlots: [],
      positionPref: this.roles,
      properties: null,
      skinSelection: null
    };
    return body;
  }
};

// src/suppliers/start-find-match.supplier.ts
var StartFindMatchSupplier = class {
  constructor(apiRequest, jwt, partyId, puuid, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.partyId = partyId;
    this.puuid = puuid;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/parties`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}/members/${this.puuid}/startAction`,
      method,
      headers: this.headers,
      body: {}
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
};

// src/suppliers/accept-match.supplier.ts
var AcceptMatchSupplier = class {
  constructor(apiRequest, jwt, accountId, summonerId, inventoryToken, summonerSpells, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.accountId = accountId;
    this.summonerId = summonerId;
    this.inventoryToken = inventoryToken;
    this.summonerSpells = summonerSpells;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/team-builder-ledge/v2/indicateAfkReadiness`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/accountId/${this.accountId}/summonerId/${this.summonerId}`,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
  get body() {
    const body = {
      additionalInventoryJwt: "",
      afkReady: true,
      initialSpellIds: this.summonerSpells,
      lastSelectedSkinIdByChampionId: {},
      simplifiedInventoryJwt: this.inventoryToken
    };
    return body;
  }
};

// src/suppliers/sipt.supplier.ts
var SiptSupplier = class {
  constructor(apiRequest, jwt, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/sipt/v1/sipt/token`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-login)`
    };
    return headers;
  }
};

// src/suppliers/inventory.supplier.ts
var InventorySupplier = class {
  constructor(apiRequest, jwt, puuid, accountId, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.accountId = accountId;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/lolinventoryservice-ledge/v1/inventories/simple?inventoryTypes=CHAMPION&inventoryTypes=CHAMPION_SKIN`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers,
      params: this.params
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-inventory)`
    };
    return headers;
  }
  get params() {
    const params = {
      puuid: `${this.puuid}`,
      location: getRegion(this.region).discoverousServiceLocation,
      accountId: `${this.accountId}`
      // inventoryTypes: ["CHAMPION", "CHAMPION_SKIN"],
      // includef2p: "true",
    };
    return params;
  }
};

// src/suppliers/unregister.supplier.ts
var UnregisterSupplier = class {
  constructor(apiRequest, jwt, puuid, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/players`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "POST" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/unregister`,
      method,
      headers: this.headers,
      body: {}
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
};

// src/suppliers/party-user-token.supplier.ts
var PartyUserTokenSupplier = class {
  constructor(apiRequest, jwt, puuid, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.puuid = puuid;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/summoner-ledge/v1/regions/${getRegion(this.region).regionLower}/summoners/puuid`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.puuid}/jwt`,
      method,
      headers: this.headers,
      body: {}
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-summoner)`
    };
    return headers;
  }
};

// src/client/VirtualClient.ts
var import_promises = require("timers/promises");

// src/utils/spinner.util.ts
var readline = __toESM(require("readline"));
function startSpinner(message) {
  const frames = ["\u25DC", "\u25E0", "\u25DD", "\u25DE", "\u25E1", "\u25DF"];
  let i = 0;
  const interval = setInterval(() => {
    const output = `\x1B[33m${message} ${frames[i]}\x1B[0m `;
    i = (i + 1) % frames.length;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(output);
  }, 100);
  return interval;
}
function stopSpinner(timer, success = true) {
  clearInterval(timer);
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  if (success) {
    console.log("\x1B[32m\u2714\x1B[0m Done");
  } else {
    console.log("\x1B[31m\u2716\x1B[0m Aborted");
  }
}

// src/utils/progress-bar.util.ts
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function formatTime(ms) {
  const minutes = Math.floor(ms / 6e4);
  const seconds = Math.floor(ms % 6e4 / 1e3);
  return `${minutes}m ${seconds}s`;
}
async function progressBar(progress, blocking = false, totalTime = 1e3, startTime = Date.now()) {
  const width = 40;
  const percent = Math.round(progress * 100);
  const complete = Math.round(width * progress);
  const incomplete = width - complete;
  const filledChar = "\u2588";
  const emptyChar = "\u2591";
  let bar = "[" + filledChar.repeat(complete) + emptyChar.repeat(incomplete) + "]";
  bar += " " + percent.toString().padStart(3) + "%";
  const elapsedTime = Date.now() - startTime;
  bar += " | Time: " + formatTime(elapsedTime);
  process.stdout.write("\r" + bar);
  if (blocking && progress < 1) {
    const updates = 100;
    const delayTime = totalTime / updates;
    const progressIncrement = 1 / updates;
    await delay(delayTime);
    await progressBar(progress + progressIncrement, blocking, totalTime, startTime);
  }
  if (progress === 1) {
    process.stdout.write("\n");
  }
}

// src/utils/utils.ts
function millisecondsToMinutes(milliseconds) {
  const minutes = Math.floor(milliseconds / 6e4);
  const seconds = Math.floor(milliseconds % 6e4 / 1e3);
  return minutes + " minutes " + seconds + " seconds";
}

// src/suppliers/party-type.supplier.ts
var PartyTypeSupplier = class {
  constructor(apiRequest, jwt, partyId, type, region, clientVersion) {
    this.apiRequest = apiRequest;
    this.jwt = jwt;
    this.partyId = partyId;
    this.type = type;
    this.region = region;
    this.clientVersion = clientVersion;
    this.URL = `${getRegion(this.region).leagueEdgeUrl}/parties-ledge/v1/parties`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "PUT" }) {
    const response = await this.apiRequest.request({
      url: `${this.URL}/${this.partyId}`,
      method,
      headers: this.headers,
      body: this.body
    });
    return response;
  }
  get headers() {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": `LeagueOfLegendsClient/${this.clientVersion} (rcp-be-lol-lobby)`
    };
    return headers;
  }
  get body() {
    const body = this.type;
    return body;
  }
};

// src/suppliers/version.supplier.ts
var VersionSupplier = class {
  constructor(apiRequest, region) {
    this.apiRequest = apiRequest;
    this.region = region;
    this.URL = `https://sieve.services.riotcdn.net/api/v1/products/lol/version-sets/${getRegion(this.region).regionUpper}?q[platform]=windows&q[artifact_type_id]=lol-game-client&q[published]=true`;
    this.apiRequest = apiRequest;
  }
  async makeRequest({ method = "GET" }) {
    const response = await this.apiRequest.request({
      url: this.URL,
      method,
      headers: this.headers
    });
    return response;
  }
  get headers() {
    const headers = {
      Accept: "application/json"
    };
    return headers;
  }
};

// src/client/VirtualClient.ts
var VirtualClient = class {
  constructor() {
    this._apiRequest = new ApiRequest();
  }
  listen(callback) {
    this._callback = callback;
  }
  async login(username, password, region = "BR" /* BR */) {
    this.gameVersion = await this.getGameVersion(region);
    this.clientVersion = await this.getClientVersion();
    Logger.green("Starting login process... \n");
    Logger.green(`Selected Region: ${getRegion(region).name} 
`);
    this._username = username;
    this._password = password;
    this._region = region;
    try {
      const riotClientParsedTokens = QueryTokenParser.parse(
        await this.getTokens("CLIENT")
      );
      this._riotToken = riotClientParsedTokens.access_token;
      this.callCallback(
        "VIRTUAL_CLIENT_RIOT_TOKEN" /* VIRTUAL_CLIENT_RIOT_TOKEN */,
        this._riotToken
      );
      Logger.cyan(`[Riot Token]: ${this._riotToken} 
`);
      const lolParsedTokens = QueryTokenParser.parse(
        await this.getTokens("LOL")
      );
      this._lolToken = lolParsedTokens.access_token;
      this.callCallback(
        "VIRTUAL_CLIENT_LOL_TOKEN" /* VIRTUAL_CLIENT_LOL_TOKEN */,
        this._lolToken
      );
      Logger.cyan(`[LoL Token]: ${this._lolToken} 
`);
      this._userInfoToken = await this.getUserInfo();
      this._entitlementsToken = await this.getEntitlements();
      this._queueToken = await this.getQueue();
      this._sessionToken = await this.getSession();
      this._geoPassToken = await this.getGeopas();
      this._userData = await this.getUserData();
      [this._inventoryToken, this._playerChampions] = await this.getInventory();
      this._partyUserToken = await this.getPartyUserToken();
      this._siptToken = await this.getSipt();
      await (0, import_promises.setTimeout)(1e3);
      setInterval(async () => {
        this._sessionToken = await this.getRefreshSession();
        this.callCallback(
          "VIRTUAL_CLIENT_SESSION_TOKEN" /* VIRTUAL_CLIENT_SESSION_TOKEN */,
          this._lolToken
        );
      }, +riotClientParsedTokens.expires_in * 100);
    } catch (error) {
      console.log(error);
      Logger.red("Error while logging in! \n");
      process.exit(1);
    }
    Logger.green("[Virtual Client] Logged in! \n");
  }
  getPlayerChampions() {
    return this._playerChampions;
  }
  async getPartyUserToken() {
    const partyUserTokenSupplier = new PartyUserTokenSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._region,
      this.clientVersion
    );
    const { data } = await partyUserTokenSupplier.makeRequest({});
    Logger.cyan(`[Party User Token]: ${data} 
`);
    this.callCallback("VIRTUAL_CLIENT_PARTY_TOKEN" /* VIRTUAL_CLIENT_PARTY_TOKEN */, data);
    return data;
  }
  async unregisterLobby() {
    Logger.green("Unregitering lobby... \n");
    const unregisterSupplier = new UnregisterSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._region,
      this.clientVersion
    );
    await unregisterSupplier.makeRequest({});
    this.callCallback("VIRTUAL_CLIENT_LOBBY_UNREGISTERED" /* VIRTUAL_CLIENT_LOBBY_UNREGISTERED */);
    Logger.green("Lobby Unregistered \n");
  }
  async createLobby() {
    Logger.green("Creating lobby... \n");
    const partySupplier = new PartySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken,
      this._partyUserToken,
      this._userInfoToken,
      this._region,
      this.gameVersion,
      this.clientVersion
    );
    const { data } = await partySupplier.makeRequest({});
    this._partyId = data.currentParty.partyId;
    Logger.cyan(`[Lobby ID]: ${this._partyId} 
`);
    Logger.green("Lobby created! \n");
    this.callCallback(
      "VIRTUAL_CLIENT_LOBBY_CREATED" /* VIRTUAL_CLIENT_LOBBY_CREATED */,
      this._partyId
    );
  }
  async changePartyType(type) {
    const partyTypeSupplier = new PartyTypeSupplier(
      this._apiRequest,
      this._lolToken,
      this._partyId,
      type,
      this._region,
      this.clientVersion
    );
    const { data } = await partyTypeSupplier.makeRequest({});
    Logger.cyan(`[Party Type Supplier]: ${data} 
`);
    this._partyType = type;
    return data;
  }
  async selectGamemode(gamemode = 420 /* RANKED_SOLO_DUO */) {
    Logger.green("Selecting gamemode... \n");
    const gamemodeSupplier = new GamemodeSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      gamemode,
      this._region,
      this.clientVersion
    );
    const { data } = await gamemodeSupplier.makeRequest({});
    const playersCount = data.currentParty.players.length;
    Logger.yellow(`[Players Count]: ${playersCount} 
`);
    Logger.green("Gamemode selected! \n");
    this.callCallback("VIRTUAL_CLIENT_SELECT_GAMEMODE" /* VIRTUAL_CLIENT_SELECT_GAMEMODE */, data);
    return data;
  }
  async selectRoles(roles = ["FILL" /* FILL */, "UNSELECTED" /* UNSELECTED */]) {
    Logger.green("Selecting roles... \n");
    const roleSupplier = new RoleSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub,
      roles,
      this._region,
      this.clientVersion
    );
    const { data } = await roleSupplier.makeRequest({});
    Logger.green("Roles selected! \n");
    this.callCallback("VIRTUAL_CLIENT_ROLES_SELECTED" /* VIRTUAL_CLIENT_ROLES_SELECTED */);
  }
  async startFindingMatch() {
    Logger.green("Starting to find match... \n");
    const startMatchSupplier = new StartFindMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._partyId,
      this._userData.sub,
      this._region,
      this.clientVersion
    );
    const { data } = await startMatchSupplier.makeRequest({});
    this.callCallback("VIRTUAL_CLIENT_FINDING_MATCH" /* VIRTUAL_CLIENT_FINDING_MATCH */);
    const activeRestrictions = data.currentParty?.activeRestrictions?.gatekeeperRestrictions;
    if (activeRestrictions?.length > 0) {
      const reason = activeRestrictions[0].reason;
      const remainingMillis = activeRestrictions[0].remainingMillis;
      Logger.red("You are restricted from matchmaking! \n");
      Logger.red(`Reason: ${reason} 
`);
      Logger.red(`Time: ${millisecondsToMinutes(remainingMillis)}`);
      this.callCallback("VIRTUAL_CLIENT_MATCH_RESTRICTED" /* VIRTUAL_CLIENT_MATCH_RESTRICTED */, {
        reason,
        remainingMillis
      });
      await progressBar(0, true, remainingMillis);
    }
    Logger.green("Finding match! \n");
  }
  async acceptMatchLoop(summonerSpells) {
    const spin = startSpinner("Searching for a match...");
    let accepted = false;
    while (!accepted) {
      accepted = await this.acceptMatch(summonerSpells);
      await (0, import_promises.setTimeout)(7500);
    }
    stopSpinner(spin);
    return accepted;
  }
  getPartyId() {
    return this._partyId;
  }
  getCurrentUser() {
    return this._userData;
  }
  getAllTokens() {
    return {
      riotToken: this._riotToken,
      lolToken: this._lolToken,
      entitlementsToken: this._entitlementsToken,
      userInfoToken: this._userInfoToken,
      queueToken: this._queueToken,
      sessionToken: this._sessionToken,
      geopasToken: this._geoPassToken,
      siptToken: this._siptToken,
      partyUserToken: this._partyUserToken
    };
  }
  userData() {
    return this._userData;
  }
  async acceptMatch(summonerSpells) {
    const startMatchSupplier = new AcceptMatchSupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.accountId,
      this._userData.id,
      this._inventoryToken,
      summonerSpells,
      this._region,
      this.clientVersion
    );
    const { data } = await startMatchSupplier.makeRequest({});
    if (data?.payload !== void 0) {
      Logger.magenta("Match accepted! \n");
      this.callCallback("VIRTUAL_CLIENT_MATCH_ACCEPTED" /* VIRTUAL_CLIENT_MATCH_ACCEPTED */);
      return true;
    } else {
      return false;
    }
  }
  async getTokens(cookieType) {
    const cookieSupplier = new CookieSupplier(this._apiRequest);
    cookieSupplier.cookieType = cookieType;
    const { headers: h1 } = await cookieSupplier.makeRequest({});
    cookieSupplier.additionalCookie = cookieSupplier.getCfbm(h1["set-cookie"]);
    const { headers: h2 } = await cookieSupplier.makeRequest({});
    cookieSupplier.additionalCookie = cookieSupplier.build(h2["set-cookie"]);
    const body = JSON.stringify({
      username: this._username,
      password: this._password,
      remember: false,
      language: "en_GB",
      type: "auth",
      region: null
    });
    const { data } = await cookieSupplier.makeRequest({
      method: "PUT",
      body
    });
    return data.response.parameters.uri;
  }
  async getUserInfo() {
    const riotClientUserInfo = new UserInfoSupplier(
      this._apiRequest,
      this._lolToken
    );
    const { data } = await riotClientUserInfo.makeRequest({});
    Logger.cyan(`[User Info Token]: ${data} 
`);
    this.callCallback("VIRTUAL_CLIENT_USER_INFO_TOKEN" /* VIRTUAL_CLIENT_USER_INFO_TOKEN */, data);
    return data;
  }
  async getInventory() {
    const inventorySupplier = new InventorySupplier(
      this._apiRequest,
      this._sessionToken,
      this._userData.sub,
      this._userData.accountId,
      this._region,
      this.clientVersion
    );
    const { data } = await inventorySupplier.makeRequest({});
    Logger.cyan(`[Inventory token]: ${data.data.itemsJwt} 
`);
    this.callCallback(
      "VIRTUAL_CLIENT_INVENTORY_TOKEN" /* VIRTUAL_CLIENT_INVENTORY_TOKEN */,
      data.data.itemsJwt
    );
    this.callCallback(
      "VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN" /* VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN */,
      data.data.items.CHAMPION
    );
    return [data.data.itemsJwt, data.data.items.CHAMPION];
  }
  async getEntitlements() {
    const lolClientEntitlements = new EntitlementSupplier(
      this._apiRequest,
      this._riotToken
    );
    const { data } = await lolClientEntitlements.makeRequest({});
    Logger.cyan(`[Entitlements Token]: ${data.entitlements_token} 
`);
    this.callCallback(
      "VIRTUAL_CLIENT_ENTITLEMENT_TOKEN" /* VIRTUAL_CLIENT_ENTITLEMENT_TOKEN */,
      data.entitlements_token
    );
    return data.entitlements_token;
  }
  async getQueue() {
    const queueSupplier = new QueueSupplier(
      this._apiRequest,
      this._lolToken,
      this._entitlementsToken,
      this._userInfoToken,
      this._region,
      this.clientVersion
    );
    const { data } = await queueSupplier.makeRequest({});
    Logger.cyan(`[Queue Token]: ${data.token} 
`);
    this.callCallback("VIRTUAL_CLIENT_QUEUE_TOKEN" /* VIRTUAL_CLIENT_QUEUE_TOKEN */, data.token);
    return data.token;
  }
  async getSession() {
    const sessionSupplier = new SessionSupplier(
      this._apiRequest,
      this._queueToken,
      new RiotClientUser(this._riotToken).getSub(),
      this._region,
      this.clientVersion
    );
    const { data } = await sessionSupplier.makeRequest({});
    Logger.cyan(`[Session Token]: ${data} 
`);
    this.callCallback("VIRTUAL_CLIENT_SESSION_TOKEN" /* VIRTUAL_CLIENT_SESSION_TOKEN */, data);
    return data;
  }
  async getGeopas() {
    const geopassSupplier = new GeopasSupplier(
      this._apiRequest,
      this._lolToken
    );
    const { data } = await geopassSupplier.makeRequest({});
    this.callCallback("VIRTUAL_CLIENT_GEOPASS_TOKEN" /* VIRTUAL_CLIENT_GEOPASS_TOKEN */, data);
    return data;
  }
  async getGameVersion(region) {
    const versionSupplier = new VersionSupplier(this._apiRequest, region);
    const { data } = await versionSupplier.makeRequest({});
    const gameVersion = data.releases[0].compat_version.id;
    Logger.cyan(`[Game Version]: ${gameVersion} 
`);
    this.callCallback(
      "VIRTUAL_CLIENT_GAME_VERSION" /* VIRTUAL_CLIENT_GAME_VERSION */,
      gameVersion
    );
    return gameVersion;
  }
  async getClientVersion() {
    const clientVersion = "14.10.584.5961";
    Logger.cyan(`[Client Version]: ${clientVersion} 
`);
    this.callCallback(
      "VIRTUAL_CLIENT_CLIENT_VERSION" /* VIRTUAL_CLIENT_CLIENT_VERSION */,
      clientVersion
    );
    return clientVersion;
  }
  async getSipt() {
    const siptSupplier = new SiptSupplier(
      this._apiRequest,
      this._sessionToken,
      this._region,
      this.clientVersion
    );
    const { data } = await siptSupplier.makeRequest({});
    Logger.cyan(`[Sipt Token]: ${data} 
`);
    this.callCallback("VIRTUAL_CLIENT_SIPT_TOKEN" /* VIRTUAL_CLIENT_SIPT_TOKEN */, data);
    return data;
  }
  async getUserData() {
    const userDataSupplier = new UserDataSupplier(
      this._apiRequest,
      this._sessionToken,
      new RiotClientUser(this._riotToken).getSub(),
      this._region,
      this.clientVersion
    );
    const data = await userDataSupplier.makeRequest({});
    Logger.cyan(`[User Data]:
`);
    Logger.default(data);
    this.callCallback("VIRTUAL_CLIENT_USER_DATA_TOKEN" /* VIRTUAL_CLIENT_USER_DATA_TOKEN */, data);
    return data;
  }
  callCallback(eventName, data) {
    if (this._callback)
      this._callback({ eventName, data });
  }
  async getRefreshSession() {
    const sessionRefreshSupplier = new SessionRefreshSupplier(
      this._apiRequest,
      this._sessionToken,
      this._region,
      this.clientVersion
    );
    const { data } = await sessionRefreshSupplier.makeRequest({});
    Logger.cyan(`[(REFRESH) Session Token]: ${data} 
`);
    return data;
  }
};

// src/services/rtmp/rtmp-client.service.ts
var net = __toESM(require("net"));
var tls = __toESM(require("tls"));
var import_uuid3 = require("uuid");

// src/services/rtmp/handshake/handshake.ts
var import_stream = require("stream");
var crypto = __toESM(require("crypto"));
var HANDSHAKE_STATE_UNINITIALIZED = 0;
var HANDSHAKE_STATE_VERSION_SENT = 1;
var HANDSHAKE_STATE_ACK_SENT = 2;
var HANDSHAKE_STATE_DONE = 3;
var HANDSHAKE_LENGTH_VERSION = 1;
var HANDSHAKE_LENGTH_TIME = 4;
var HANDSHAKE_LENGTH_ECHO = 4;
var HANDSHAKE_LENGTH_RANDOM = 1528;
var HANDSHAKE_LENGTH_HEAD = HANDSHAKE_LENGTH_TIME + HANDSHAKE_LENGTH_ECHO;
var HANDSHAKE_LENGTH = HANDSHAKE_LENGTH_HEAD + HANDSHAKE_LENGTH_RANDOM;
var getUnixTime = () => Math.trunc(Date.now() / 1e3);
var C0 = (version = 3) => {
  return Buffer.from([version]);
};
var C1 = () => {
  const buf = Buffer.allocUnsafe(HANDSHAKE_LENGTH_HEAD);
  buf.writeUInt32BE(getUnixTime(), 0);
  buf.writeUInt32BE(0, HANDSHAKE_LENGTH_TIME);
  return Buffer.concat([buf, crypto.randomBytes(1528)]);
};
var C2 = (prev) => {
  const time = prev.readUInt32BE(0);
  const random = prev.slice(HANDSHAKE_LENGTH_HEAD);
  const buf = Buffer.allocUnsafe(HANDSHAKE_LENGTH_HEAD);
  buf.writeUInt32BE(time, 0);
  buf.writeUInt32BE(getUnixTime(), HANDSHAKE_LENGTH_TIME);
  return Buffer.concat([buf, random]);
};
var Handshake = class extends import_stream.Transform {
  constructor() {
    super(...arguments);
    this.buffers = [];
    this.state = HANDSHAKE_STATE_UNINITIALIZED;
    this.c0 = C0();
    this.c1 = C1();
  }
  initialize(socket) {
    this.once("done", () => {
      this.unpipe(socket);
      socket.unpipe(this);
    });
    this.pipe(socket).pipe(this);
    socket.write(Buffer.concat([this.c0, this.c1]));
    this.state = HANDSHAKE_STATE_VERSION_SENT;
  }
  getBufferLength(chunkLength = 0) {
    return this.buffers.reduce((memo, buf) => memo + buf.length, chunkLength);
  }
  _transform(chunk, encoding, callback) {
    try {
      if (this.state === HANDSHAKE_STATE_DONE) {
        this.push(chunk);
        return callback();
      } else if (this.state === HANDSHAKE_STATE_VERSION_SENT && this.getBufferLength(chunk.length) > HANDSHAKE_LENGTH) {
        const buf = Buffer.concat(this.buffers.concat(chunk));
        this.buffers = [buf.slice(HANDSHAKE_LENGTH + HANDSHAKE_LENGTH_VERSION)];
        const s0 = buf.slice(0, HANDSHAKE_LENGTH_VERSION);
        if (Buffer.compare(this.c0, s0)) {
          this.emit("error");
          return;
        }
        const s1 = buf.slice(
          HANDSHAKE_LENGTH_VERSION,
          HANDSHAKE_LENGTH + HANDSHAKE_LENGTH_VERSION
        );
        this.c2 = C2(s1);
        this.state = HANDSHAKE_STATE_ACK_SENT;
        this.push(this.c2);
        this._transform(Buffer.allocUnsafe(0), encoding, callback);
      } else if (this.state === HANDSHAKE_STATE_ACK_SENT && this.getBufferLength(chunk.length) >= HANDSHAKE_LENGTH) {
        const buf = Buffer.concat(this.buffers.concat(chunk));
        this.buffers = [];
        const s2 = buf.slice(HANDSHAKE_LENGTH_HEAD, HANDSHAKE_LENGTH);
        if (Buffer.compare(this.c1.slice(HANDSHAKE_LENGTH_HEAD), s2)) {
          this.emit("error");
          return;
        }
        this.state = HANDSHAKE_STATE_DONE;
        this.emit("done");
        return callback();
      } else {
        this.buffers.push(chunk);
        return callback();
      }
    } catch (err) {
      return callback(err);
    }
  }
};

// src/services/rtmp/rtmp-info.builder.ts
var RtmpConnectInfo = class {
  constructor(map) {
    this.map = map;
  }
  getValue(property) {
    return this.map[property];
  }
  getMap() {
    return this.map;
  }
};
var RtmoInfoBuilder = class _RtmoInfoBuilder {
  constructor() {
    this.properties = {};
  }
  replicate() {
    const builder = new _RtmoInfoBuilder();
    const list = Object.entries(this.properties);
    for (const [key, value] of list) {
      builder.set(key, value);
    }
    return builder;
  }
  set(property, value) {
    this.properties[property] = value;
    return this;
  }
  setApp(value) {
    return this.set("app", value);
  }
  setFlashVersion(value) {
    return this.set("flashVer", value);
  }
  setSwfURL(value) {
    return this.set("swfUrl", value);
  }
  setTcURL(value) {
    return this.set("tcUrl", value);
  }
  setFPAD(value) {
    return this.set("fpad", value);
  }
  setCapabilities(value) {
    return this.set("capabilities", value);
  }
  setAudioCodecs(value) {
    return this.set("audioCodecs", value);
  }
  setVideoCodecs(value) {
    return this.set("videoCodecs", value);
  }
  setVideoFunction(value) {
    return this.set("objectEncoding", value);
  }
  setPageURL(value) {
    return this.set("pageUrl", value);
  }
  setObjectEncoding(value) {
    return this.set("objectEncoding", value);
  }
  build() {
    return new RtmpConnectInfo(this.properties);
  }
};

// src/services/rtmp/amf/amf0-type.ts
var AMF0Type = /* @__PURE__ */ ((AMF0Type2) => {
  AMF0Type2[AMF0Type2["NUMBER"] = 0] = "NUMBER";
  AMF0Type2[AMF0Type2["BOOLEAN"] = 1] = "BOOLEAN";
  AMF0Type2[AMF0Type2["STRING"] = 2] = "STRING";
  AMF0Type2[AMF0Type2["OBJECT"] = 3] = "OBJECT";
  AMF0Type2[AMF0Type2["MOVIECLIP"] = 4] = "MOVIECLIP";
  AMF0Type2[AMF0Type2["NULL"] = 5] = "NULL";
  AMF0Type2[AMF0Type2["UNDEFINED"] = 6] = "UNDEFINED";
  AMF0Type2[AMF0Type2["REFERENCE"] = 7] = "REFERENCE";
  AMF0Type2[AMF0Type2["MIXEDARRAY"] = 8] = "MIXEDARRAY";
  AMF0Type2[AMF0Type2["OBJECTTERM"] = 9] = "OBJECTTERM";
  AMF0Type2[AMF0Type2["ARRAY"] = 10] = "ARRAY";
  AMF0Type2[AMF0Type2["DATE"] = 11] = "DATE";
  AMF0Type2[AMF0Type2["LONGSTRONG"] = 12] = "LONGSTRONG";
  AMF0Type2[AMF0Type2["UNSUPPORTED"] = 13] = "UNSUPPORTED";
  AMF0Type2[AMF0Type2["RECORDSET"] = 14] = "RECORDSET";
  AMF0Type2[AMF0Type2["XML"] = 15] = "XML";
  AMF0Type2[AMF0Type2["TYPEDOBJECT"] = 16] = "TYPEDOBJECT";
  AMF0Type2[AMF0Type2["AMF3"] = 17] = "AMF3";
  return AMF0Type2;
})(AMF0Type || {});
((AMF0Type2) => {
  function find(value) {
    return Object.values(AMF0Type2).find((v) => typeof v === "number" && v === value);
  }
  AMF0Type2.find = find;
})(AMF0Type || (AMF0Type = {}));

// src/services/rtmp/amf/amf-decoder.ts
var import_polyfill = require("@js-temporal/polyfill");

// src/services/rtmp/amf/amf3-type.ts
var AMF3Type = /* @__PURE__ */ ((AMF3Type2) => {
  AMF3Type2[AMF3Type2["UNDEFINED"] = 0] = "UNDEFINED";
  AMF3Type2[AMF3Type2["NULL"] = 1] = "NULL";
  AMF3Type2[AMF3Type2["BOOLEAN_FALSE"] = 2] = "BOOLEAN_FALSE";
  AMF3Type2[AMF3Type2["BOOLEAN_TRUE"] = 3] = "BOOLEAN_TRUE";
  AMF3Type2[AMF3Type2["INTEGER"] = 4] = "INTEGER";
  AMF3Type2[AMF3Type2["DOUBLE"] = 5] = "DOUBLE";
  AMF3Type2[AMF3Type2["STRING"] = 6] = "STRING";
  AMF3Type2[AMF3Type2["XMLDOCUMENT"] = 7] = "XMLDOCUMENT";
  AMF3Type2[AMF3Type2["DATE"] = 8] = "DATE";
  AMF3Type2[AMF3Type2["ARRAY"] = 9] = "ARRAY";
  AMF3Type2[AMF3Type2["OBJECT"] = 10] = "OBJECT";
  AMF3Type2[AMF3Type2["XML"] = 11] = "XML";
  AMF3Type2[AMF3Type2["BYTEARRAY"] = 12] = "BYTEARRAY";
  AMF3Type2[AMF3Type2["VECTORINT"] = 13] = "VECTORINT";
  AMF3Type2[AMF3Type2["VECTORUNIT"] = 14] = "VECTORUNIT";
  AMF3Type2[AMF3Type2["VECTORDOUBLE"] = 15] = "VECTORDOUBLE";
  AMF3Type2[AMF3Type2["VECTOROBJECT"] = 16] = "VECTOROBJECT";
  AMF3Type2[AMF3Type2["DICTIONARY"] = 17] = "DICTIONARY";
  return AMF3Type2;
})(AMF3Type || {});
((AMF3Type2) => {
  function find(value) {
    return Object.values(AMF3Type2).find((v) => typeof v === "number" && v === value);
  }
  AMF3Type2.find = find;
})(AMF3Type || (AMF3Type = {}));

// src/services/rtmp/typed-object.ts
var TypedObject = class _TypedObject extends Map {
  constructor(type) {
    super();
    this.type = type || null;
  }
  setType(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
  getInteger(key) {
    const value = this.get(key);
    return value === void 0 ? null : Number(value);
  }
  getLong(key) {
    const value = this.get(key);
    return value === void 0 ? null : Number(value);
  }
  getString(key) {
    const value = this.get(key);
    return value === void 0 ? null : String(value);
  }
  getTypedObject(key) {
    const value = this.get(key);
    return value instanceof _TypedObject ? value : null;
  }
  toString() {
    const entries = Array.from(this.entries()).map(([key, value]) => `"${key}": ${JSON.stringify(value)}`).join(", ");
    const typeString = this.type ? `"type": "${this.type}", ` : "";
    return `{ ${typeString}${entries} }`;
  }
  static createArrayCollection(arr) {
    const typedObject = new _TypedObject("flex.messaging.io.ArrayCollection");
    typedObject.set("array", arr);
    return typedObject;
  }
  static fromJson(json) {
    const typedObject = new _TypedObject();
    for (const key in json) {
      typedObject.set(key, _TypedObject.convert(json[key]));
    }
    return typedObject;
  }
  static convert(value) {
    if (value instanceof Object && !(value instanceof Array)) {
      return _TypedObject.fromJson(value);
    } else if (value instanceof Array) {
      return value.map(_TypedObject.convert);
    }
    return value;
  }
};
var typed_object_default = TypedObject;

// src/services/rtmp/amf/amf-decoder.ts
var AMFDecoder = class {
  constructor() {
    this.classListAMF3 = [];
    this.objectListAMF0 = [];
    this.objectListAMF3 = [];
    this.stringListAMF3 = [];
  }
  resetAMF0() {
    this.objectListAMF0 = [];
  }
  read() {
    return this.data[this.position++];
  }
  readBytes(l) {
    const b = Buffer.alloc(l);
    for (let i = 0; i < l; i++) {
      b[i] = this.read();
    }
    return b;
  }
  readNumberAMF0() {
    return this.readDouble();
  }
  readByteAsInteger() {
    return (this.read() & 255) >>> 0;
  }
  readDouble() {
    let value = 0n;
    for (let i = 0; i < 8; i++)
      value = (value << 8n) + BigInt(this.readByteAsInteger());
    return this.longBitsToDouble(value);
  }
  longBitsToDouble(value) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, value, false);
    return view.getFloat64(0, false);
  }
  readBooleanAMF0() {
    return this.readBoolean();
  }
  readBoolean() {
    return this.read() === 1;
  }
  readUTF8StringAMF0() {
    const length = this.readByteAsInteger() << 8 | this.readByteAsInteger();
    return length !== 0 ? this.readBytes(length).toString("utf-8") : "";
  }
  readAMF0Pair() {
    const key = this.readUTF8StringAMF0();
    const object = this.decodeAMF0();
    return [key, object];
  }
  readObjectAMF0() {
    const object = new typed_object_default();
    let pair;
    do {
      pair = this.readAMF0Pair();
      object.set(pair[0], pair[1]);
    } while (!(pair[1] instanceof ObjectTerminateAMF0));
    return object;
  }
  readNullAMF0() {
    return null;
  }
  readTypeReferenceAMF0() {
    const index = this.readByteAsInteger() << 8 | this.readByteAsInteger();
    const reference = this.objectListAMF0[index];
    return reference;
  }
  readObjectTermAMF0() {
    return ObjectTerminateAMF0.INSTANCE;
  }
  storeObjectAMF0(object) {
    this.objectListAMF0.push(object);
  }
  readInteger() {
    let value = 0;
    for (let i = 0; i < 4; i++) {
      value = (value << 8) + this.readByteAsInteger();
    }
    return value;
  }
  readArrayAMF0() {
    const entries = this.readInteger();
    const objects = new Array(entries);
    this.storeObjectAMF0(objects);
    for (let i = 0; i < entries; i++) {
      objects[i] = this.decodeAMF0();
    }
    return objects;
  }
  readDateAMF0() {
    const timestamp = this.readNumberAMF0();
    const length = (this.readByteAsInteger() << 8 | this.readByteAsInteger()) / 60;
    const offsetSign = length >= 0 ? "+" : "-";
    const offsetHours = Math.abs(length).toString().padStart(2, "0");
    const timeZone = import_polyfill.Temporal.TimeZone.from(`${offsetSign}${offsetHours}:00`);
    const calendar = import_polyfill.Temporal.Calendar.from("iso8601");
    const zonedDateTime = import_polyfill.Temporal.Instant.fromEpochMilliseconds(
      timestamp
    ).toZonedDateTime({ timeZone, calendar });
    return zonedDateTime.toPlainDateTime();
  }
  readTypedObjectAMF0() {
    const object = new typed_object_default();
    this.storeObjectAMF0(object);
    object.set(this.readUTF8StringAMF0(), this.readObjectAMF0());
    return object;
  }
  readUndefinedAMF3() {
    return "AMF3_UNDEFINED";
  }
  readNullAMF3() {
    return null;
  }
  readBooleanFalseAMF3() {
    return false;
  }
  readBooleanTrueAMF3() {
    return true;
  }
  readIntegerAMF3() {
    let result = 0;
    let n = 0;
    let b = this.readByteAsInteger();
    while ((b & 128) !== 0 && n < 3) {
      result <<= 7;
      result |= b & 127;
      b = this.readByteAsInteger();
      n++;
    }
    if (n < 3) {
      result <<= 7;
      result |= b;
    } else {
      result <<= 8;
      result |= b;
      if ((result & 268435456) !== 0)
        result |= 3758096384;
    }
    return result;
  }
  readDoubleAMF3() {
    return this.readDouble();
  }
  getStoredStringAMF3(index) {
    return this.stringListAMF3[index];
  }
  storeStringAMF3(string) {
    this.stringListAMF3.push(string);
  }
  readUTF8StringAMF3() {
    let result;
    const type = this.readIntegerAMF3();
    if ((type & 1) === 0)
      result = this.getStoredStringAMF3(type >> 1);
    else {
      const length = type >> 1;
      if (length > 0) {
        const bytes = this.readBytes(length);
        try {
          result = bytes.toString("utf-8");
        } catch (error) {
          if (error instanceof TypeError) {
            throw new Error("Malformed input: " + error.message);
          } else {
            throw error;
          }
        }
        this.storeStringAMF3(result);
      } else {
        result = "";
      }
    }
    return result;
  }
  getStoredObjectAMF3(index) {
    return this.objectListAMF3[index];
  }
  storeObjectAMF3(object) {
    this.objectListAMF3.push(object);
  }
  readDateAMF3() {
    throw new Error("Method not implemented.");
  }
  readArrayAMF3() {
    const type = this.readIntegerAMF3();
    if ((type & 1) === 0) {
      return this.getStoredObjectAMF3(type >> 1);
    } else {
      const size = type >> 1;
      const key = this.readUTF8StringAMF3();
      if (key.length === 0) {
        const objects = new Array(size);
        this.storeObjectAMF3(objects);
        for (let i = 0; i < size; i++) {
          objects[i] = this.decodeAMF3();
        }
        return objects;
      } else {
        throw new Error("Associative arrays are not supported");
      }
    }
  }
  storeClassDefinitionAMF3(classDefinition) {
    this.classListAMF3.push(classDefinition);
  }
  getStoredClassDefinitionAMF3(index) {
    return this.classListAMF3[index];
  }
  readFlagData() {
    const flags = [];
    let flag;
    do {
      flags.push(flag = this.readByteAsInteger());
    } while ((flag & 128) !== 0);
    return flags;
  }
  readRemaining(flag, bits) {
    if (flag >> bits !== 0) {
      for (let i = bits; i < 6; i++) {
        if ((flag >> i & 1) !== 0) {
          const o = this.decodeAMF3();
          console.log(`Ignoring AMF3 ${o}`);
        }
      }
    }
  }
  convertByteArrayToId(bytes) {
    const builder = [];
    for (let i = 0; i < bytes.length; i++) {
      if (i === 4 || i === 6 || i === 8 || i === 10)
        builder.push("-");
      builder.push(bytes[i].toString(16).padStart(2, "0"));
    }
    return builder.join("");
  }
  readDSK() {
    const typedObject = this.readDSA();
    const flags = this.readFlagData();
    flags.forEach((flag) => {
      this.readRemaining(flag, 0);
    });
    return typedObject;
  }
  readByteArrayAMF3() {
    const type = this.readIntegerAMF3();
    if ((type & 1) === 0) {
      return this.getStoredObjectAMF3(type >> 1);
    } else {
      const bytes = this.readBytes(type >> 1);
      const uint8Array = new Uint8Array(bytes);
      this.storeObjectAMF3(uint8Array);
      return uint8Array;
    }
  }
  readDSA() {
    const typedObject = new typed_object_default("DSA");
    const flags = this.readFlagData();
    for (let i = 0; i < flags.length; i++) {
      const flag = flags[i];
      let bits = 0;
      if (i === 0) {
        if ((flag & 1) !== 0)
          typedObject.set("body", this.decodeAMF3());
        if ((flag & 2) !== 0)
          typedObject.set("clientId", this.decodeAMF3());
        if ((flag & 4) !== 0)
          typedObject.set("destination", this.decodeAMF3());
        if ((flag & 8) !== 0)
          typedObject.set("headers", this.decodeAMF3());
        if ((flag & 16) !== 0)
          typedObject.set("messageId", this.decodeAMF3());
        if ((flag & 32) !== 0)
          typedObject.set("timeStamp", this.decodeAMF3());
        if ((flag & 64) !== 0)
          typedObject.set("timeToLive", this.decodeAMF3());
        bits = 7;
      } else if (i === 1) {
        if ((flag & 1) !== 0) {
          typedObject.set(
            "clientId",
            this.convertByteArrayToId(this.decodeAMF3())
          );
        }
        if ((flag & 2) !== 0) {
          typedObject.set(
            "messageId",
            this.convertByteArrayToId(this.decodeAMF3())
          );
        }
        bits = 2;
      }
      this.readRemaining(flag, bits);
    }
    const flags2 = this.readFlagData();
    for (let i = 0; i < flags2.length; i++) {
      const flag = flags2[i];
      let bits = 0;
      if (i === 0) {
        if ((flag & 1) !== 0)
          typedObject.set("correlationId", this.decodeAMF3());
        if ((flag & 2) !== 0) {
          const ignored = this.readByteAsInteger();
          typedObject.set(
            "correlationId",
            this.convertByteArrayToId(Array.from(this.readByteArrayAMF3()))
          );
        }
        bits = 2;
      }
      this.readRemaining(flag, bits);
    }
    return typedObject;
  }
  readJson() {
    let size = 0;
    for (let i = 0; i < 4; i++) {
      size = size * 256 + this.readByteAsInteger();
    }
    const jsonString = new TextDecoder().decode(this.readBytes(size));
    const jsonObj = JSON.parse(jsonString);
    return typed_object_default.fromJson(jsonObj);
  }
  readObjectAMF3() {
    const type = this.readIntegerAMF3();
    if ((type & 1) === 0) {
      return this.getStoredObjectAMF3(type >> 1);
    } else {
      const defineInline = (type >> 1 & 1) !== 0;
      let classDefinition;
      if (defineInline) {
        classDefinition = new ClassDefinition();
        classDefinition.externalizable = (type >> 2 & 1) !== 0;
        classDefinition.encoding = type >> 2 & 3;
        classDefinition.properties = new Array(type >> 4);
        classDefinition.className = this.readUTF8StringAMF3();
        for (let i = 0; i < classDefinition.properties.length; i++) {
          classDefinition.properties[i] = this.readUTF8StringAMF3();
        }
        this.storeClassDefinitionAMF3(classDefinition);
      } else {
        classDefinition = this.getStoredClassDefinitionAMF3(type);
      }
      let typedObject = new typed_object_default(classDefinition.className);
      this.storeObjectAMF3(typedObject);
      if (classDefinition.externalizable) {
        switch (classDefinition.className) {
          case "DSK":
            typedObject = this.readDSK();
            break;
          case "DSA":
            typedObject = this.readDSA();
            break;
          case "flex.messaging.io.ArrayCollection":
            typedObject = typed_object_default.createArrayCollection(
              this.decodeAMF3()
            );
            break;
          case "com.riotgames.platform.systemstate.ClientSystemStatesNotification":
          case "com.riotgames.platform.broadcast.BroadcastNotification":
          case "com.riotgames.platform.summoner.SummonerCatalog":
          case "com.riotgames.platform.game.GameTypeConfigDTO":
            typedObject = this.readJson();
            break;
          default:
            throw new Error(
              `Unhandled Externalizable: ${classDefinition.className}
RAW:`
            );
        }
      } else {
        for (let i = 0; i < classDefinition.properties.length; i++) {
          typedObject.set(classDefinition.properties[i], this.decodeAMF3());
        }
        if (classDefinition.encoding === 2) {
          while (true) {
            const key = this.readUTF8StringAMF3();
            if (key.length === 0)
              break;
            typedObject.set(key, this.decodeAMF3());
          }
        }
      }
      return typedObject;
    }
  }
  decodeAMF3() {
    const op = this.read();
    const type = AMF3Type.find(op);
    if (type === void 0) {
      throw new Error(`Unknown AMF3 type: ${op}`);
    }
    let amf3;
    switch (type) {
      case 0 /* UNDEFINED */:
        amf3 = this.readUndefinedAMF3();
        break;
      case 1 /* NULL */:
        amf3 = this.readNullAMF3();
        break;
      case 2 /* BOOLEAN_FALSE */:
        amf3 = this.readBooleanFalseAMF3();
        break;
      case 3 /* BOOLEAN_TRUE */:
        amf3 = this.readBooleanTrueAMF3();
        break;
      case 4 /* INTEGER */:
        amf3 = this.readIntegerAMF3();
        break;
      case 5 /* DOUBLE */:
        amf3 = this.readDoubleAMF3();
        break;
      case 6 /* STRING */:
        amf3 = this.readUTF8StringAMF3();
        break;
      case 7 /* XMLDOCUMENT */:
        break;
      case 8 /* DATE */:
        amf3 = this.readDateAMF3();
        break;
      case 9 /* ARRAY */:
        amf3 = this.readArrayAMF3();
        break;
      case 10 /* OBJECT */:
        amf3 = this.readObjectAMF3();
        break;
      case 11 /* XML */:
        break;
      case 12 /* BYTEARRAY */:
        amf3 = this.readByteArrayAMF3();
        break;
      case 13 /* VECTORINT */:
        break;
      case 14 /* VECTORUNIT */:
        break;
      case 15 /* VECTORDOUBLE */:
        break;
      case 16 /* VECTOROBJECT */:
        break;
      case 17 /* DICTIONARY */:
        break;
      default:
        throw new Error(`Unknown AMF3 type: ${op}`);
    }
    return amf3;
  }
  decodeAMF0() {
    const op = this.read();
    const type = AMF0Type.find(op);
    if (type === void 0) {
      throw new Error("Unknown AMF0 type: " + op);
    }
    let amf0;
    switch (type) {
      case 0 /* NUMBER */:
        amf0 = this.readNumberAMF0();
        break;
      case 1 /* BOOLEAN */:
        amf0 = this.readBooleanAMF0();
        break;
      case 2 /* STRING */:
        amf0 = this.readUTF8StringAMF0();
        break;
      case 3 /* OBJECT */:
        amf0 = this.readObjectAMF0();
        break;
      case 4 /* MOVIECLIP */:
        break;
      case 5 /* NULL */:
        amf0 = this.readNullAMF0();
        break;
      case 6 /* UNDEFINED */:
        break;
      case 7 /* REFERENCE */:
        amf0 = this.readTypeReferenceAMF0();
        break;
      case 8 /* MIXEDARRAY */:
        break;
      case 9 /* OBJECTTERM */:
        amf0 = this.readObjectTermAMF0();
        break;
      case 10 /* ARRAY */:
        amf0 = this.readArrayAMF0();
        break;
      case 11 /* DATE */:
        amf0 = this.readDateAMF0();
        break;
      case 12 /* LONGSTRONG */:
        break;
      case 13 /* UNSUPPORTED */:
        break;
      case 14 /* RECORDSET */:
        break;
      case 15 /* XML */:
        break;
      case 16 /* TYPEDOBJECT */:
        amf0 = this.readTypedObjectAMF0();
        break;
      case 17 /* AMF3 */:
        amf0 = this.decodeAMF3();
        break;
      default:
        throw new Error("Unknown AMF0 type: " + op);
    }
    return amf0;
  }
  decode(b, typedObject) {
    this.resetBuffer();
    this.resetAMF0();
    this.data = b;
    if (this.data[0] == 0) {
      this.position++;
      typedObject.set("version", 0);
    }
    typedObject.set("result", this.decodeAMF0());
    typedObject.set("invokeId", this.decodeAMF0());
    typedObject.set("serviceCall", this.decodeAMF0());
    typedObject.set("data", this.decodeAMF0());
    if (this.position != this.data.length) {
      throw new Error(
        "The buffer has not been fully consumed: " + this.position + " of " + this.data.length + "\nRAW: " + b.toString("hex")
      );
    }
    return typedObject;
  }
  resetBuffer() {
    this.data = Buffer.alloc(0);
    this.position = 0;
  }
};
var ClassDefinition = class {
  constructor() {
    this.externalizable = false;
    this.encoding = 0;
    this.properties = [];
    this.className = "";
  }
};
var _ObjectTerminateAMF0 = class _ObjectTerminateAMF0 {
  toString() {
    return `ObjectTerminate{internal=${_ObjectTerminateAMF0.internal}}`;
  }
};
_ObjectTerminateAMF0.INSTANCE = new _ObjectTerminateAMF0();
_ObjectTerminateAMF0.internal = 9 /* OBJECTTERM */;
var ObjectTerminateAMF0 = _ObjectTerminateAMF0;

// src/services/rtmp/rtmp-packet.ts
var RtmpPacket = class {
  constructor(initialHeader) {
    this.initialHeader = initialHeader;
    this.headerPosition = 0;
    this.bodyPosition = 0;
  }
  setMessageType(messageType) {
    this.messageType = messageType;
  }
  setHeaderSize(headerSize) {
    this.header = Buffer.alloc(headerSize);
    this.headerSize = headerSize;
  }
  addToHeader(b) {
    this.header[this.headerPosition++] = b;
  }
  setBodySize(bodySize) {
    this.body = Buffer.alloc(bodySize);
    this.bodySize = bodySize;
  }
  addToBody(b) {
    this.body[this.bodyPosition++] = b;
  }
  getInitialHeader() {
    return this.initialHeader;
  }
  getMessageType() {
    return this.messageType;
  }
  getHeaderPosition() {
    return this.headerPosition;
  }
  getHeaderSize() {
    return this.headerSize;
  }
  getBodyPosition() {
    return this.bodyPosition;
  }
  getBodySize() {
    return this.bodySize;
  }
  getHeader() {
    return this.header;
  }
  getBody() {
    return this.body;
  }
  isComplete() {
    return this.headerSize === this.headerPosition && this.bodySize === this.bodyPosition;
  }
  toString() {
    return `RtmpPacket{complete=${this.isComplete()}, initialHeader=${this.initialHeader}, headerPosition=${this.headerPosition}, headerSize=${this.headerSize}, bodyPosition=${this.bodyPosition}, bodySize=${this.bodySize}}`;
  }
};

// src/services/rtmp/rtmp-packet-reader.ts
var import_zlib = require("zlib");
var RtmpPacketReader = class {
  constructor(client) {
    this.client = client;
    this.packets = /* @__PURE__ */ new Map();
    this.decoder = new AMFDecoder();
    this.tag = null;
  }
  listen(callback) {
    this._callback = callback;
  }
  handleReceivedData(data) {
    let offset = 0;
    const map = /* @__PURE__ */ new Map();
    while (offset < data.length) {
      const initialHeader = data[offset++];
      const channel = initialHeader & 47;
      const headerType = initialHeader & 192;
      let headerSize = 0;
      if (headerType === 0) {
        headerSize = 12;
      } else if (headerType === 64) {
        headerSize = 8;
      } else if (headerType === 128) {
        headerSize = 4;
      } else if (headerType === 192) {
        headerSize = 1;
      }
      if (!map.has(channel))
        map.set(channel, new RtmpPacket(initialHeader));
      const packet = map.get(channel);
      if (headerSize > 1) {
        const header = Buffer.alloc(headerSize - 1);
        packet.setHeaderSize(header.length);
        for (let i = 0; i < header.length; i++) {
          header[i] = data[offset++];
          packet.addToHeader(header[i]);
        }
        if (headerSize >= 8) {
          let size = 0;
          for (let i = 3; i < 6; i++) {
            size = size * 256 + (header[i] & 255);
          }
          packet.setBodySize(size);
          packet.setMessageType(header[6]);
        }
      }
      for (let i = 0; i < 128; i++) {
        const b = data[offset++];
        packet.addToBody(b);
        if (packet.isComplete())
          break;
      }
      if (packet.isComplete()) {
        this.handleRtmpPacket(packet);
        map.delete(channel);
      }
    }
  }
  getPacketByTag(tag) {
    return this.packets.get(tag);
  }
  setTag(tag) {
    this.tag = tag;
  }
  handleRtmpPacket(packet) {
    const messageType = packet.getMessageType();
    if (messageType === void 0)
      return;
    let result;
    switch (messageType) {
      case 1:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 8:
        break;
      case 9:
        break;
      case 17:
        result = this.decoder.decode(packet.getBody(), new typed_object_default("Invoke"));
        break;
      case 20:
        result = this.decoder.decode(packet.getBody(), new typed_object_default("Connect"));
        break;
      default:
        console.warn(`Unhandled RTMP message type: ${messageType}`);
    }
    if (!result)
      return;
    if (process.env?.LOL_HEADLESS_CLIENT_RTMP_LOGS === "true") {
      Logger.magenta("[SENT RTMP ->] \n");
      Logger.default(result);
    }
    this.setDsid(result);
    this.setTagFromResult(result);
    this.championSelectActions(result);
  }
  setDsid(result) {
    if (this.client.DSId)
      return;
    if (result.getTypedObject("data").getString("id")) {
      this.client.DSId = result.getTypedObject("data").getString("id");
      Logger.magenta(`[RTMP] DSiD: ${this.client.DSId} 
`);
      if (this._callback)
        this._callback({ eventName: "RTMP_DSID" /* RTMP_DSID */, data: this.client.DSId });
    }
  }
  setTagFromResult(result) {
    if (this.tag) {
      this.packets.set(this.tag, result);
      this.tag = null;
    }
  }
  championSelectActions(result) {
    const body = result.getTypedObject("data")?.getTypedObject("body");
    const isMethodName = body?.getString("methodName") === "tbdGameDtoV1";
    const isServiceName = body?.getString("serviceName") === "teambuilder-draft";
    if (!isMethodName || !isServiceName)
      return;
    const compresed = body.getString("payload");
    const state = this.decodeGzipBase64(compresed).championSelectState;
    const subphase = state.subphase;
    const actionSetList = state.actionSetList;
    const playerCellId = state.localPlayerCellId;
    const currentActionIndex = state.currentActionSetIndex;
    if (subphase === "GAME_STARTING") {
      this.client.pickState.gameStarted = true;
      Logger.green("=== Game started! ===");
      if (this._callback)
        this._callback({ eventName: "RTMP_GAME_STARTED" /* RTMP_GAME_STARTED */ });
      return;
    }
    this.client.pickState.isMyTurnToPick = this.isMyTurnToPickOrBan(
      actionSetList,
      playerCellId,
      currentActionIndex,
      "PICK"
    );
    this.client.pickState.isMyTurnToBan = this.isMyTurnToPickOrBan(
      actionSetList,
      playerCellId,
      currentActionIndex,
      "BAN"
    );
    this.myPickPhaseActions(actionSetList, playerCellId);
    this.myBanPhaseActions(actionSetList, playerCellId);
  }
  decodeGzipBase64(input) {
    const buffer = Buffer.from(input, "base64");
    const decompressed = (0, import_zlib.gunzipSync)(buffer);
    return JSON.parse(decompressed.toString());
  }
  myBanPhaseActions(actionSetList, myCellId) {
    if (this.client.pickState.bannedChampion)
      return;
    for (const group of actionSetList) {
      for (const item of group) {
        if (item.actorCellId === myCellId && item.type === "BAN") {
          this.client.pickState.banActionId = item.actionId;
          Logger.green(`Ban actionID ${this.client.pickState.banActionId} 
`);
          if (item.completed === true) {
            this.client.pickState.isChampBanned = true;
            this.client.pickState.bannedChampion = item.championId;
            Logger.red(`Banned champion: ${ChampionName[item.championId]}
`);
            if (this._callback)
              this._callback({
                eventName: "RTMP_BANNED_CHAMPTION" /* RTMP_BANNED_CHAMPTION */,
                data: ChampionName[item.championId]
              });
          }
        }
      }
    }
  }
  myPickPhaseActions(actionSetList, myCellId) {
    if (this.client.pickState.isChampPicked)
      return;
    for (const group of actionSetList) {
      for (const item of group) {
        if (item.actorCellId === myCellId && item.type === "PICK") {
          this.client.pickState.pickActionId = item.actionId;
          Logger.green(`Pick actionID ${this.client.pickState.pickActionId} 
`);
          if (item.completed === true) {
            this.client.pickState.isChampPicked = true;
            this.client.pickState.pickedChampion = item.championId;
            Logger.green(`Picked champion: ${ChampionName[item.championId]}
`);
            if (this._callback)
              this._callback({
                eventName: "RTMP_PICKED_CHAMPTION" /* RTMP_PICKED_CHAMPTION */,
                data: ChampionName[item.championId]
              });
          }
        }
      }
    }
  }
  isMyTurnToPickOrBan(state, actorCellId, actionSetIndex, type) {
    if (actionSetIndex === -1)
      return false;
    const currentActionSet = state[actionSetIndex];
    for (const action of currentActionSet) {
      if (action.actorCellId === actorCellId && action.type === type) {
        Logger.green(`Is my turn to ${type} 
`);
        if (this._callback)
          this._callback({ eventName: "RTMP_MY_TURN_TO_PICK_CHAMPTION" /* RTMP_MY_TURN_TO_PICK_CHAMPTION */ });
        return true;
      }
    }
    return false;
  }
};

// src/services/rtmp/amf/amf-encoder.ts
var import_uuid2 = require("uuid");
var AMFEncoder = class {
  constructor() {
    this.buffer = Buffer.alloc(0);
    this.timestamp = Date.now();
  }
  encodeInvoke(id, data) {
    this.buffer = Buffer.alloc(0);
    this.writeByte(0);
    this.writeByte(5);
    this.writeAMF0Integer(id);
    this.writeByte(5);
    this.writeByte(17 /* AMF3 */);
    this.encode(data);
    this.addHeader();
    return this.buffer;
  }
  encodeConnect(map) {
    this.buffer = Buffer.alloc(0);
    this.writeAMF0UTF8String("connect");
    this.writeAMF0Integer(1);
    this.writeByte(17 /* AMF3 */);
    this.writeByte(9 /* ARRAY */);
    this.writeAMF3AssociativeArray(map);
    this.writeBytes(1, 0);
    this.writeAMF0UTF8String("nil");
    this.writeAMF0UTF8String("");
    const commandMessage = new typed_object_default(
      "flex.messaging.messages.CommandMessage"
    );
    commandMessage.set("messageRefType", null);
    commandMessage.set("operation", 5);
    commandMessage.set("correlationId", "");
    commandMessage.set("clientId", null);
    commandMessage.set("destination", "");
    commandMessage.set("messageId", this.generateUUID());
    commandMessage.set("timestamp", 0);
    commandMessage.set("timeToLive", 0);
    commandMessage.set("body", new typed_object_default());
    const headers = /* @__PURE__ */ new Map();
    headers.set("DSMessagingVersion", 1);
    headers.set("DSId", "my-rtmp");
    commandMessage.set("headers", headers);
    this.writeByte(17);
    this.encode(commandMessage);
    this.addHeader();
    this.buffer[7] = 20;
    return this.buffer;
  }
  addHeader() {
    const header = Buffer.alloc(12);
    header[0] = 3;
    const timeOffset = Date.now() - this.timestamp;
    header[1] = (timeOffset & 16711680) >> 16;
    header[2] = (timeOffset & 65280) >> 8;
    header[3] = timeOffset & 255;
    header[4] = (this.buffer.length & 16711680) >> 16;
    header[5] = (this.buffer.length & 65280) >> 8;
    header[6] = this.buffer.length & 255;
    header[7] = 17;
    header[8] = 0;
    header[9] = 0;
    header[10] = 0;
    header[11] = 0;
    const list = [];
    for (let i = 0; i < this.buffer.length; i++) {
      list.push(this.buffer[i]);
      if (i % 128 === 127 && i !== this.buffer.length - 1) {
        list.push(195);
      }
    }
    const bytes = Buffer.alloc(header.length + list.length);
    header.copy(bytes, 0);
    for (let i = 0; i < list.length; i++) {
      bytes[header.length + i] = list[i];
    }
    this.buffer = bytes;
  }
  generateUUID() {
    return (0, import_uuid2.v4)();
  }
  encode(o) {
    if (o === null) {
      this.writeByte(1 /* NULL */);
    } else if (typeof o === "boolean") {
      const type = o ? 3 /* BOOLEAN_TRUE */ : 2 /* BOOLEAN_FALSE */;
      this.writeByte(type);
    } else if (typeof o === "number" && Number.isInteger(o)) {
      this.writeByte(4 /* INTEGER */);
      this.writeAMF3Integer(o);
    } else if (typeof o === "number") {
      this.writeByte(5 /* DOUBLE */);
      this.writeAMF3Double(o);
    } else if (typeof o === "string") {
      this.writeByte(6 /* STRING */);
      this.writeAMF3StringUTF8(o);
    } else if (o instanceof Date) {
      this.writeByte(8 /* DATE */);
      this.writeAMF3Date(o);
    } else if (Buffer.isBuffer(o)) {
      this.writeByte(12 /* BYTEARRAY */);
    } else if (Array.isArray(o)) {
      this.writeByte(9 /* ARRAY */);
      this.writeAMF3Array(o);
    } else if (o instanceof typed_object_default) {
      this.writeByte(10 /* OBJECT */);
      this.writeAMF3TypedObject(o);
    } else if (o instanceof Map) {
      this.writeByte(9 /* ARRAY */);
      this.writeAMF3AssociativeArray(o);
    } else {
      throw new Error("Unexpected type: " + typeof o);
    }
  }
  writeAMF3Double(value) {
    if (isNaN(value)) {
      this.writeBytes(127, 255, 255, 255, 224, 0, 0, 0);
    } else {
      const tmp = Buffer.alloc(8);
      const b = Buffer.alloc(this.buffer.length + tmp.length);
      this.buffer.copy(b, 0, 0, this.buffer.length);
      tmp.writeDoubleBE(value, 0);
      tmp.copy(b, this.buffer.length, 0, tmp.length);
      this.buffer = b;
    }
  }
  writeAMF3Date(date) {
    this.writeByte(1);
    this.writeAMF3Double(date.getTime());
  }
  writeAMF3ByteArray(bytes) {
    throw new Error("Encoding byte arrays is not implemented");
  }
  writeAMF0UTF8String(text) {
    const required = 3 + text.length;
    const b = Buffer.alloc(this.buffer.length + required);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    b[this.buffer.length] = 2 /* STRING */;
    b.writeUInt16BE(text.length, this.buffer.length + 1);
    b.write(text, this.buffer.length + 3, text.length, "utf8");
    this.buffer = b;
  }
  writeAMF0Integer(number) {
    const b = Buffer.alloc(this.buffer.length + 9);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    b[this.buffer.length] = 0 /* NUMBER */;
    const tmp = Buffer.alloc(8);
    tmp.writeDoubleBE(number, 0);
    tmp.copy(b, this.buffer.length + 1, 0, tmp.length);
    this.buffer = b;
  }
  writeByte(b) {
    this.writeBytes(b);
  }
  writeBytes(...bytes) {
    const b = Buffer.alloc(this.buffer.length + bytes.length);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    for (let i = 0; i < bytes.length; i++) {
      b[this.buffer.length + i] = bytes[i];
    }
    this.buffer = b;
  }
  writeAMF3AssociativeArray(map) {
    this.writeByte(1);
    for (const [key, value] of Object.entries(map)) {
      this.writeAMF3StringUTF8(key);
      this.encode(value);
    }
    this.writeByte(1);
  }
  writeAMF3StringUTF8(text) {
    const bytes = Buffer.from(text, "utf8");
    this.writeAMF3Integer(bytes.length << 1 | 1);
    const b = Buffer.alloc(this.buffer.length + bytes.length);
    this.buffer.copy(b, 0, 0, this.buffer.length);
    bytes.copy(b, this.buffer.length, 0, bytes.length);
    this.buffer = b;
  }
  writeAMF3Integer(value) {
    if (value >= 2097152 || value < 0) {
      this.writeBytes(
        value >> 22 & 127 | 128,
        value >> 15 & 127 | 128,
        value >> 8 & 127 | 128,
        value & 255
      );
    } else {
      if (value >= 16384) {
        this.writeByte(value >> 14 & 127 | 128);
      }
      if (value >= 128) {
        this.writeByte(value >> 7 & 127 | 128);
      }
      this.writeByte(value & 127);
    }
  }
  writeAMF3Array(arr) {
    this.writeAMF3Integer(arr.length << 1 | 1);
    this.writeByte(1);
    for (const o of arr) {
      this.encode(o);
    }
  }
  writeAMF3TypedObject(typedObject) {
    const type = typedObject.getType();
    if (type === null || type === "") {
      this.writeBytes(11, 1);
      for (const key of typedObject.keys()) {
        this.writeAMF3StringUTF8(key);
        this.encode(typedObject.get(key));
      }
      this.writeByte(1);
    } else if (type === "flex.messaging.io.ArrayCollection") {
      this.writeByte(7);
      this.writeAMF3StringUTF8(type);
      this.encode(typedObject.get("array"));
    } else {
      this.writeAMF3Integer(typedObject.size << 4 | 3);
      this.writeAMF3StringUTF8(type);
      const list = [];
      for (const key of typedObject.keys()) {
        this.writeAMF3StringUTF8(key);
        list.push(key);
      }
      for (const key of list)
        this.encode(typedObject.get(key));
    }
  }
};

// src/services/rtmp/rtmp-client.service.ts
var import_promises2 = require("timers/promises");
var RtmpClient = class {
  constructor(host, port, tokens, userData, username) {
    this.host = host;
    this.port = port;
    this.tokens = tokens;
    this.userData = userData;
    this.username = username;
    this.pickState = {
      pickActionId: null,
      banActionId: null,
      isChampPicked: false,
      isChampBanned: false,
      pickedChampion: null,
      bannedChampion: null,
      isMyTurnToPick: false,
      isMyTurnToBan: false,
      gameStarted: false
    };
    this.invokeID = 2;
    this.messageCounter = 0;
    this.heartbeatCounter = 0;
    this.amfEncoder = new AMFEncoder();
    this.rtmpConnected = false;
    this.baseRtmpInfo = new RtmoInfoBuilder();
    this.baseRtmpInfo.setFlashVersion("WIN 11,7,700,169").setFPAD(false).setCapabilities(239).setAudioCodecs(3191).setVideoCodecs(242).setVideoFunction(1).setObjectEncoding(3);
    this.rtmpPacketReader = new RtmpPacketReader(this);
    this.DSId = null;
  }
  listen(callback) {
    this._callback = callback;
    this.rtmpPacketReader.listen(this._callback);
  }
  async connect() {
    return new Promise((resolve, reject) => {
      const socket = net.connect(this.port, this.host, () => {
        this.socket = tls.connect({
          socket,
          rejectUnauthorized: false
        });
        this.socket.on("secureConnect", () => {
          Logger.magenta("[RTMP] TLS connected \n");
          this.callCallback("RTMP_TLS_CONNECTED" /* RTMP_TLS_CONNECTED */);
          this.rtmpConnected = true;
          resolve();
        }).on("error", (error) => {
          console.error("Error:", error);
          reject(error);
        });
      });
      socket.on("error", (error) => {
        console.error("Error:", error);
        reject(error);
      });
    });
  }
  async handshake() {
    return new Promise((resolve, reject) => {
      const handshake = new Handshake();
      handshake.initialize(this.socket);
      handshake.once("done", () => {
        Logger.magenta("[RTMP] Handshake done \n");
        this.callCallback("RTMP_HANDSHAKE_DONE" /* RTMP_HANDSHAKE_DONE */);
        this.socket.removeAllListeners();
        resolve();
      });
      handshake.once("error", (error) => {
        this.socket.removeAllListeners();
        reject(error);
      });
    });
  }
  async startListening() {
    this.socket.on("data", (data) => {
      try {
        this.rtmpPacketReader.handleReceivedData(data);
      } catch (error) {
        console.error("Error handling received data:", error);
      }
    });
    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
    this.socket.on("close", () => {
      Logger.red("Socket closed");
    });
  }
  async connectToRiot() {
    return new Promise(async (resolve, reject) => {
      const rtmpConnectInfo = this.baseRtmpInfo.replicate().setApp("").setSwfURL("app:/LolClient.swf/[[DYNAMIC]]/50").setTcURL(`rtmps://${this.host}:${this.port}`).setPageURL("").build();
      try {
        await this.write(
          this.amfEncoder.encodeConnect(rtmpConnectInfo.getMap())
        );
        setTimeout(() => {
          resolve();
        }, 2e3);
      } catch (error) {
        reject(error);
      }
    });
  }
  async login() {
    return new Promise(async (resolve, reject) => {
      this.rtmpPacketReader.setTag("login");
      const typedObject = new typed_object_default(
        "com.riotgames.platform.login.AuthenticationCredentials"
      );
      typedObject.set("macAddress", "000000000000");
      typedObject.set("authToken", "");
      typedObject.set("userInfoTokenJwe", this.tokens.userInfoToken);
      typedObject.set("leagueSessionToken", this.tokens.sessionToken);
      typedObject.set("sessionIpToken", this.tokens.siptToken);
      typedObject.set("partnerCredentials", this.tokens.lolToken);
      typedObject.set("domain", "lolclient.lol.riotgames.com");
      typedObject.set("clientVersion", "LCU");
      typedObject.set("locale", "en_GB");
      typedObject.set("username", this.username);
      typedObject.set(
        "operatingSystem",
        '{"edition":"Professional, x64","platform":"Windows","versionMajor":"10","versionMinor":""}'
      );
      typedObject.set("securityAnswer", null);
      typedObject.set("oldPassword", null);
      typedObject.set("password", null);
      await this.invoke(this.wrap("loginService", "login", typedObject));
      setTimeout(() => {
        resolve();
      }, 3e3);
    });
  }
  async login2() {
    const interval = 12e4;
    return new Promise(async (resolve, reject) => {
      const body = this.rtmpPacketReader.getPacketByTag("login").getTypedObject("data").getTypedObject("body");
      this.token = body.getString("token");
      this.accountId = body.getTypedObject("accountSummary").getLong("accountId");
      const channels = ["gn", "cn", "bc"];
      for (let i = 1; i >= 0; i--) {
        for (const channel of channels) {
          this.subscribe(`${channel}-${this.accountId}`, i);
        }
      }
      await (0, import_promises2.setTimeout)(500);
      const buffer = Buffer.from(
        `${this.username.toLowerCase()}:${this.token}`,
        "utf-8"
      );
      const base64Encoded = buffer.toString("base64");
      const auth = this.wrap("auth", 8, base64Encoded);
      auth.setType("flex.messaging.messages.CommandMessage");
      this.invoke(auth);
      await (0, import_promises2.setTimeout)(500);
      this.heartbeat();
      setInterval(() => {
        this.heartbeat();
      }, interval);
      setTimeout(() => {
        resolve();
      }, 2e3);
    });
  }
  async subscribe(client, operation) {
    const body = this.wrap("messagingDestination", operation, [
      new typed_object_default()
    ]);
    body.setType("flex.messaging.messages.CommandMessage");
    const headers = new typed_object_default();
    headers.set("DSEndpoint", "my-rtmp");
    headers.set(
      "DSSubtopic",
      !client.startsWith("b") ? client : client.split("-")[0]
    );
    headers.set("DSRequestTimeout", 60);
    headers.set("DSId", this.DSId);
    body.set("headers", headers);
    body.set("clientId", client);
    await this.invoke(body);
  }
  heartbeat() {
    const now = /* @__PURE__ */ new Date();
    const formatedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`;
    const data = [
      this.accountId,
      this.token,
      ++this.heartbeatCounter,
      formatedDate
    ];
    Logger.magenta(`[RTMP] Heartbeat - ${this.heartbeatCounter} count 
`);
    this.callCallback("RTMP_HEARTBEAT" /* RTMP_HEARTBEAT */, this.heartbeatCounter);
    try {
      this.invoke(this.wrap("loginService", "performLCDSHeartBeat", data));
    } catch (e) {
      console.error("[rtmp-out] failed to send heartbeat");
    }
  }
  async banChampionsLoop(champion) {
    while (!this.pickState.isChampBanned) {
      await this.banChampion(champion);
      await (0, import_promises2.setTimeout)(2e3);
    }
    return true;
  }
  async banChampion(championId) {
    if (this.pickState.isChampBanned || !this.pickState.isMyTurnToBan)
      return;
    Logger.red(`Trying to ban champion ${ChampionName[championId]}`);
    await this.championAction(championId, this.pickState.banActionId);
  }
  async selectChampionsLoop(champions) {
    while (!this.pickState.isChampPicked) {
      await this.selectChampion(champions);
      await (0, import_promises2.setTimeout)(2e3);
    }
    return true;
  }
  async selectChampion(championIds) {
    if (this.pickState.isChampPicked || !this.pickState.isMyTurnToPick)
      return;
    const selectedChampion = championIds[Math.floor(Math.random() * championIds.length)];
    Logger.magenta(
      `Trying to select champion ${ChampionName[selectedChampion]}`
    );
    await this.championAction(selectedChampion, this.pickState.pickActionId);
  }
  async championAction(selectedChampion, actionId) {
    console.log({
      actionId,
      championId: selectedChampion,
      completed: true
    });
    await this.invoke(
      this.wrap("lcdsServiceProxy", "call", [
        (0, import_uuid3.v4)(),
        "teambuilder-draft",
        "updateActionV1",
        JSON.stringify({
          actionId,
          championId: selectedChampion,
          completed: true
        })
      ])
    );
  }
  async selectChampionCustom() {
    Logger.magenta(`Trying to select champion`);
    await this.invoke(
      this.wrap("gameService", "selectChampionV2", [22, 22022])
    );
  }
  async reportPlayer(gameId, offenderSummonerId) {
    Logger.magenta(`Trying to report player`);
    await this.invoke(
      this.wrap("lcdsServiceProxy", "call", [
        (0, import_uuid3.v4)(),
        "report",
        "reportPlayer",
        JSON.stringify({
          comments: "",
          gameId,
          offenderSummonerId,
          offenses: "NEGATIVE_ATTITUDE,VERBAL_ABUSE,ASSISTING_ENEMY_TEAM"
        })
      ])
    );
  }
  async read() {
    return new Promise((resolve, reject) => {
      this.socket.once("readable", () => {
        const byte = this.socket.read(1);
        if (byte) {
          resolve(byte.readUInt8(0));
        } else {
          reject(new Error("Failed to read byte from the socket."));
        }
      });
      this.socket.once("error", (error) => {
        reject(error);
      });
    });
  }
  async write(buffer) {
    return new Promise((resolve, reject) => {
      this.socket.write(buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  async invoke(typedObject) {
    const id = this.nextInvokeID();
    await this.submit(id, typedObject);
    return id;
  }
  async submit(id, typedObject) {
    const data = this.amfEncoder.encodeInvoke(id, typedObject);
    await this.write(data);
  }
  wrap(destination, operation, body) {
    const headers = new typed_object_default();
    headers.set("DSRequestTimeout", 60);
    headers.set("DSId", this.DSId);
    headers.set("DSEndpoint", "my-rtmp");
    const typedObject = new typed_object_default(
      "flex.messaging.messages.RemotingMessage"
    );
    typedObject.set("destination", destination);
    typedObject.set("operation", operation);
    typedObject.set("source", null);
    typedObject.set("timestamp", 0);
    typedObject.set(
      "messageId",
      `${this.userData.accountId}-${this.messageCounter++}`
    );
    typedObject.set("timeToLive", 0);
    typedObject.set("clientId", null);
    typedObject.set("headers", headers);
    typedObject.set("body", body);
    return typedObject;
  }
  async close() {
    this.socket.destroy();
  }
  nextInvokeID() {
    return this.invokeID++;
  }
  callCallback(eventName, data) {
    if (this._callback)
      this._callback({ eventName, data });
  }
};

// src/services/xmpp/xmpp.client.service.ts
var tls2 = __toESM(require("tls"));
var import_promises3 = require("timers/promises");
var import_xml2js = require("xml2js");

// src/services/xmpp/xmpp.utils.ts
function generateRandomDigitsForChat(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit.toString();
  }
  if (result.startsWith("0")) {
    result = "1" + result.substring(1);
  }
  return result;
}
var BASE_PLAYER_INFO = {
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
  skinname: ""
};
function removeRcPart(input) {
  return input.replace(/\/RC-\d+$/, "");
}
function getFormattedDate() {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// src/services/xmpp/xmpp.client.service.ts
var XmppClient = class {
  constructor(rsoToken, pasToken, entitlementsToken, region) {
    this.rsoToken = rsoToken;
    this.pasToken = pasToken;
    this.entitlementsToken = entitlementsToken;
    this.region = region;
    this.heartbeatCounter = 0;
    this.host = "";
    this.port = 5223;
    this.xmppRegion = "";
    this.lastChatHistoryFriendJid = "";
    this.authMessages = [];
    const { xmppUrl, regionLower } = getRegion(this.region);
    this.host = xmppUrl;
    this.xmppRegion = regionLower;
    this.authMessages = [
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<auth mechanism="X-Riot-RSO-PAS" xmlns="urn:ietf:params:xml:ns:xmpp-sasl"><rso_token>${this.rsoToken}</rso_token><pas_token>${this.pasToken}</pas_token></auth>`,
      `<?xml version="1.0" encoding="UTF-8"?><stream:stream to="${this.xmppRegion}.pvp.net" xml:lang="en" version="1.0" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams">`,
      `<iq id="_xmpp_bind1" type="set"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><puuid-mode enabled="true"/><resource>RC-3138377982</resource></bind></iq>`,
      `<iq type="set" id="xmpp_entitlements_0"><entitlements xmlns="urn:riotgames:entitlements"><token>${this.entitlementsToken}</token></entitlements></iq><iq id="_xmpp_session1" type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"><platform>riot</platform></session></iq>`,
      `<iq type="get" id="1"><query xmlns="jabber:iq:riotgames:roster" last_state="true"/></iq><iq type="get" id="privacy_update_2"><query xmlns="jabber:iq:privacy"><list name="LOL"/></query></iq><iq type="get" id="recent_convos_3"><query xmlns="jabber:iq:riotgames:archive:list"/></iq><iq id='update_session_active_4' type='set'><query xmlns='jabber:iq:riotgames:session'><session mode='active'/></query></iq><presence id='presence_5'><show>chat</show><status></status><games><keystone><st>chat</st><s.t>1715443396510</s.t><m></m><s.p>keystone</s.p><pty/></keystone></games></presence>`,
      `<presence/>`
    ];
  }
  listen(callback) {
    this._callback = callback;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = tls2.connect(this.port, this.host);
      this.socket.on("secureConnect", async () => {
        Logger.yellow("[XMPP] Connected. \n");
        this.callCallback("XMPP_CONNECTED" /* XMPP_CONNECTED */);
        this.read();
        await (0, import_promises3.setTimeout)(500);
        await this.sendAuthMessages();
        await (0, import_promises3.setTimeout)(2e3);
        await this.getFriendList();
        await (0, import_promises3.setTimeout)(1e3);
        this.heartBeat = setInterval(() => {
          this.heartbeat();
        }, 29e3);
        resolve();
      }).on("error", (error) => {
        console.error("Error:", error);
        reject(error);
      }).on("end", () => {
        clearInterval(this.heartBeat);
        Logger.yellow("[XMPP] Server ended the connection");
        this.callCallback("XMPP_DISCONNECTED" /* XMPP_DISCONNECTED */);
      });
    });
  }
  async disconnect() {
    if (this.socket) {
      this.socket.end();
      Logger.yellow("[XMPP] Disconnected.");
      this.callCallback("XMPP_DISCONNECTED" /* XMPP_DISCONNECTED */);
    }
  }
  async addFriend(username, tagline) {
    if (tagline.startsWith("#"))
      tagline = tagline.substring(1);
    await this.write(
      `<iq id="roster_add_1" type="set"><query xmlns="jabber:iq:riotgames:roster"><item subscription="pending_out"><id name="${username}" tagline="${tagline.toLowerCase()}"></id></item></query></iq>`
    );
  }
  async setInfo({
    status,
    statusMessage = "",
    playerInfo = BASE_PLAYER_INFO
  }) {
    const info = JSON.stringify(playerInfo);
    const now = Date.now();
    await this.write(
      `<presence id='presence_1'><show>chat</show><status>${statusMessage}</status><games><keystone><st>chat</st><s.t>${now}</s.t><m></m><s.p>keystone</s.p><pty/></keystone><league_of_legends><s.r>BR1</s.r><st>${status}</st><s.t>${now}</s.t><m></m><p>${info}</p><s.p>league_of_legends</s.p><s.c>live</s.c><pty/></league_of_legends></games></presence>`
    );
  }
  async sendMessage(message, jid) {
    const id = generateRandomDigitsForChat(13);
    await this.write(
      `<message id="${id}:1" to="${jid}" type="chat"><body>${message}</body></message>`
    );
  }
  async markChatHistoryAsRead(jid) {
    jid = removeRcPart(jid);
    const id = generateRandomDigitsForChat(2);
    await this.write(
      `<iq type="set" id="set_archive_read_${id}"><query xmlns="jabber:iq:riotgames:archive:read"><acknowledge with="${jid}" read="${getFormattedDate()}" /></query></iq>`
    );
  }
  async getChatHistory(jid, markChatHistoryAsRead = true) {
    if (markChatHistoryAsRead) {
      this.markChatHistoryAsRead(jid);
    }
    this.lastChatHistoryFriendJid = removeRcPart(jid);
    const id = generateRandomDigitsForChat(2);
    await this.write(
      `<iq type="get" id="get_archive_${id}"><query xmlns="jabber:iq:riotgames:archive"><with>${this.lastChatHistoryFriendJid}</with></query></iq>`
    );
  }
  async getFriendList() {
    await this.write(
      `<iq type="get" id="2"><query xmlns="jabber:iq:riotgames:roster" last_state="true" /></iq>`
    );
  }
  async sendAuthMessages() {
    return new Promise(async (resolve) => {
      for (const message of this.authMessages) {
        await this.write(message);
        await (0, import_promises3.setTimeout)(500);
      }
      await (0, import_promises3.setTimeout)(2e3);
      resolve();
    });
  }
  read() {
    let bufferedMessage = "";
    this.socket.on("data", async (data) => {
      data = data.toString();
      bufferedMessage += data;
      if (process.env?.LOL_HEADLESS_CLIENT_XMPP_LOGS === "true") {
        Logger.yellow("[RECEIVE XMPP <-] ");
        Logger.default(data + "\n");
      }
      while (true) {
        let completeMessage = null;
        if (bufferedMessage.includes("</stream:stream>")) {
          const endIndex = bufferedMessage.indexOf("</stream:stream>") + "</stream:stream>".length;
          completeMessage = bufferedMessage.slice(0, endIndex);
          bufferedMessage = bufferedMessage.slice(endIndex);
        } else if (bufferedMessage.includes("</stream:features>")) {
          const endIndex = bufferedMessage.indexOf("</stream:features>") + "</stream:features>".length;
          completeMessage = bufferedMessage.slice(0, endIndex);
          bufferedMessage = bufferedMessage.slice(endIndex);
        } else if (bufferedMessage.includes("</iq>")) {
          const endIndex = bufferedMessage.indexOf("</iq>") + "</iq>".length;
          completeMessage = bufferedMessage.slice(0, endIndex);
          bufferedMessage = bufferedMessage.slice(endIndex);
        } else if (bufferedMessage.includes("</success>")) {
          const endIndex = bufferedMessage.indexOf("</success>") + "</success>".length;
          completeMessage = bufferedMessage.slice(0, endIndex);
          bufferedMessage = bufferedMessage.slice(endIndex);
        } else if (bufferedMessage.includes("</presence>")) {
          const endIndex = bufferedMessage.indexOf("</presence>") + "</presence>".length;
          completeMessage = bufferedMessage.slice(0, endIndex);
          bufferedMessage = bufferedMessage.slice(endIndex);
        }
        if (!completeMessage) {
          break;
        }
        try {
          await this.parseStringPromise(completeMessage);
        } catch (error) {
        }
      }
    });
  }
  heartbeat() {
    this.write(" ");
    Logger.yellow(`[XMPP] Heartbeat - ${++this.heartbeatCounter} count 
`);
    this.callCallback("XMPP_HEARTBEAT" /* XMPP_HEARTBEAT */, this.heartbeatCounter);
  }
  async write(data) {
    return new Promise((resolve, reject) => {
      if (this.socket.readyState === "open")
        this.socket.write(data, "utf8", (err) => {
          if (err) {
            reject(err);
          } else {
            if (process.env?.LOL_HEADLESS_CLIENT_XMPP_LOGS === "true") {
              Logger.yellow("[SENT XMPP ->] ");
              Logger.default(data + "\n");
            }
            this.callCallback("XMPP_SENT_RAW" /* XMPP_SENT_RAW */, data);
            resolve();
          }
        });
    });
  }
  callCallback(eventName, data) {
    if (this._callback)
      this._callback({ eventName, data });
  }
  async parseStringPromise(xml) {
    return new Promise((resolve, reject) => {
      (0, import_xml2js.parseString)(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          try {
            this.handleParsedXml(result);
            this.callCallback("XMPP_RECEIVED_RAW" /* XMPP_RECEIVED_RAW */, xml);
          } catch (error) {
            console.log("error parsing xml", error);
          }
          resolve();
        }
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleParsedXml(jsonObj) {
    if (jsonObj.hasOwnProperty("iq")) {
      const xmlns = jsonObj?.iq?.query?.[0]?.$?.xmlns ?? null;
      if (xmlns === "jabber:iq:privacy") {
      }
      if (jsonObj?.iq?.$?.id.startsWith("_xmpp_bind")) {
        this.handleMyJid(jsonObj.iq);
      }
      if (xmlns === "jabber:iq:riotgames:roster") {
        this.handleFriendList(jsonObj.iq?.query[0]?.item ?? []);
      }
      if (jsonObj.iq?.$?.id?.startsWith("get_archive")) {
        this.handleChatHistory(jsonObj.iq);
      }
    }
    if (jsonObj.hasOwnProperty("message")) {
      this.handleMessageReceived(jsonObj.message);
    }
    if (jsonObj.hasOwnProperty("presence")) {
      this.handlePresense(jsonObj.presence);
    }
  }
  handleFriendList(players) {
    const friendList = [];
    const pendingFriends = [];
    for (const player of players) {
      const { jid, puuid, name, subscription } = player?.$;
      const state = Array.isArray(player?.state) && player.state.length > 0 ? player.state[0] : "";
      const lastOnline = Array.isArray(player?.last_online) && player.last_online.length > 0 ? player.last_online[0] : "";
      const internalName = player?.id?.[0]?.$?.name ?? "";
      const tagline = player?.id?.[0]?.$?.tagline ?? "";
      const friend = {
        jid,
        puuid,
        name,
        state,
        lastOnline,
        internalName,
        tagline
      };
      if (subscription === "both") {
        friendList.push(friend);
      }
      if (subscription === "pending_out") {
        pendingFriends.push(friend);
      }
    }
    this.callCallback("XMPP_FRIENDLIST_UPDATED" /* XMPP_FRIENDLIST_UPDATED */, friendList);
    this.callCallback(
      "XMPP_PENDING_FRIENDS_UPDATED" /* XMPP_PENDING_FRIENDS_UPDATED */,
      pendingFriends
    );
  }
  handlePresense(presence) {
    const from = presence?.$?.from;
    const chatShow = presence?.show?.[0];
    const chatStatus = presence?.status?.[0];
    const profileInfo = presence?.games?.[0]?.league_of_legends?.[0]?.p?.[0];
    Logger.default({ from });
    Logger.default({ chatShow });
    Logger.default({ chatStatus });
    Logger.default(profileInfo);
  }
  handleChatHistory(conversation) {
    const chatHistory = [];
    const myJid = removeRcPart(conversation.$.from);
    const theirJid = removeRcPart(this.lastChatHistoryFriendJid);
    this.callCallback("XMPP_MY_JID_UPDATE" /* XMPP_MY_JID_UPDATE */, myJid);
    if (!conversation?.message?.length) {
      this.callCallback("XMPP_CHAT_HISTORY_UPDATED" /* XMPP_CHAT_HISTORY_UPDATED */, {
        chatHistory,
        friendJid: theirJid
      });
      return;
    }
    const messages = conversation.message;
    messages?.map((message) => {
      const content = message.body[0];
      const sender = message.$.from;
      const receiver = message.$.to;
      const timestamp = message.$.stamp;
      const id = message.$.id;
      const type = message.$.type;
      chatHistory.push({ id, content, receiver, sender, timestamp, type });
    });
    this.callCallback("XMPP_CHAT_HISTORY_UPDATED" /* XMPP_CHAT_HISTORY_UPDATED */, {
      chatHistory,
      friendJid: theirJid
    });
    this.callCallback(
      "XMPP_CHAT_LAST_READ_UPDATED" /* XMPP_CHAT_LAST_READ_UPDATED */,
      conversation?.reader?.$?.read
    );
  }
  handleMessageReceived(data) {
    const { id, from, to, stamp, type } = data.$;
    const content = data.body[0];
    const message = {
      id,
      sender: removeRcPart(from),
      receiver: removeRcPart(to),
      timestamp: stamp,
      type,
      content
    };
    Logger.default(message);
    this.callCallback("XMPP_CHAT_RECEIVED" /* XMPP_CHAT_RECEIVED */, message);
  }
  handleMyJid(data) {
    const myJid = removeRcPart(data?.bind?.[0]?.jid?.[0]);
    this.callCallback("XMPP_MY_JID_UPDATE" /* XMPP_MY_JID_UPDATE */, myJid);
  }
};

// src/main.ts
dotenv.config();
var HeadlessClient = class {
  constructor({ region }) {
    this.region = region;
  }
  listen(callback) {
    this.callback = callback;
  }
  async login({
    username,
    password
  }) {
    this.virtualClient = await this.setupVirtualClient(
      username,
      password,
      this.region
    );
    this.rtmpClient = await this.setupRtmp(this.virtualClient, username);
    this.xmppClient = await this.setupXmpp(this.virtualClient);
  }
  getAllTokens() {
    return this.virtualClient.getAllTokens();
  }
  getPartyId() {
    return this.virtualClient.getPartyId();
  }
  getCurrentUser() {
    return this.virtualClient.getCurrentUser();
  }
  async changePartyType(type) {
    return await this.virtualClient.changePartyType(type);
  }
  async addFriend({
    username,
    tagline
  }) {
    await this.xmppClient.addFriend(username, tagline);
  }
  async sendMessage({ message, jid }) {
    await this.xmppClient.sendMessage(message, jid);
  }
  async setInfo({
    status,
    statusMessage,
    playerInfo
  }) {
    await this.xmppClient.setInfo({ status, playerInfo, statusMessage });
  }
  async getChatHistory({ jid }) {
    await this.xmppClient.getChatHistory(jid);
  }
  getPlayerChampions() {
    return this.virtualClient.getPlayerChampions();
  }
  getFriendList() {
    return this.xmppClient.getFriendList();
  }
  async createLobby() {
    await this.virtualClient.unregisterLobby();
    await this.virtualClient.createLobby();
  }
  async selectGamemode({ gamemode }) {
    await this.virtualClient.selectGamemode(gamemode);
  }
  async selectRoles({ roles }) {
    await this.virtualClient.selectRoles(roles);
  }
  async findMatch({
    summonerSpells
  }) {
    await this.virtualClient.startFindingMatch();
    await this.virtualClient.acceptMatchLoop(summonerSpells);
  }
  banChampion({ champion }) {
    this.rtmpClient.banChampionsLoop(champion);
  }
  selectChampion({ champions }) {
    this.rtmpClient.selectChampionsLoop(champions);
  }
  async logout() {
    await this.virtualClient.unregisterLobby();
    await this.xmppClient.disconnect();
  }
  async setupVirtualClient(username, password, region) {
    this.virtualClient = new VirtualClient();
    if (this.callback)
      this.virtualClient.listen(this.callback);
    await this.virtualClient.login(username, password, region);
    return this.virtualClient;
  }
  async setupRtmp(virtualClient, username) {
    const tokens = virtualClient.getAllTokens();
    const userData = virtualClient.userData();
    const { rtmpHost, rtmpPort } = getRegion(this.region);
    this.rtmpClient = new RtmpClient(
      rtmpHost,
      rtmpPort,
      tokens,
      userData,
      username
    );
    if (this.callback)
      this.rtmpClient.listen(this.callback);
    await this.rtmpClient.connect();
    await this.rtmpClient.handshake();
    await this.rtmpClient.startListening();
    await this.rtmpClient.connectToRiot();
    await this.rtmpClient.login();
    await this.rtmpClient.login2();
    return this.rtmpClient;
  }
  async setupXmpp(virtualClient) {
    const { lolToken, geopasToken, entitlementsToken } = virtualClient.getAllTokens();
    this.xmppClient = new XmppClient(
      lolToken,
      geopasToken,
      entitlementsToken,
      this.region
    );
    if (this.callback)
      this.xmppClient.listen(this.callback);
    await this.xmppClient.connect();
    return this.xmppClient;
  }
};

// src/enums/summoner-spell.enum.ts
var SummonerSpell = /* @__PURE__ */ ((SummonerSpell2) => {
  SummonerSpell2[SummonerSpell2["FLASH"] = 14] = "FLASH";
  SummonerSpell2[SummonerSpell2["IGNITE"] = 4] = "IGNITE";
  return SummonerSpell2;
})(SummonerSpell || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Champion,
  EventCallbackName,
  Gamemode,
  HeadlessClient,
  Region,
  Role,
  SummonerSpell
});

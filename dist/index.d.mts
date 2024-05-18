declare enum Champion {
    NONE = -1,
    ANNIE = 1,
    AHRI = 103,
    AKALI = 84,
    AKSHAN = 166,
    ALISTAR = 12,
    AMUMU = 32,
    ANIVIA = 34,
    APHELIOS = 523,
    ASHE = 22,
    AURELIONSOL = 136,
    AZIR = 268,
    BARD = 432,
    BELVETH = 200,
    BLITZCRANK = 53,
    BRAND = 63,
    BRAUM = 201,
    CAITLYN = 51,
    CAMILLE = 164,
    CASSIOPEIA = 69,
    CHOGATH = 31,
    CORKI = 42,
    DARIUS = 122,
    DIANA = 131,
    DRAVEN = 119,
    DRMUNDO = 36,
    EKKO = 245,
    ELISE = 60,
    EVELYNN = 28,
    EZREAL = 81,
    FIDDLESTICKS = 9,
    FIORA = 114,
    FIZZ = 105,
    GALIO = 3,
    GANGPLANK = 41,
    GAREN = 86,
    GNAR = 150,
    GRAGAS = 79,
    GRAVES = 104,
    GWEN = 887,
    HECARIM = 120,
    HEIMERDINGER = 74,
    ILLAOI = 420,
    IRELIA = 39,
    IVERN = 427,
    JANNA = 40,
    JARVANIV = 59,
    JAX = 24,
    JAYCE = 126,
    JHIN = 202,
    JINX = 222,
    KAISA = 145,
    KALISTA = 429,
    KARMA = 43,
    KARTHUS = 30,
    KASSADIN = 38,
    KATARINA = 55,
    KAYLE = 10,
    KAYN = 141,
    KENNEN = 85,
    KHAZIX = 121,
    KINDRED = 203,
    KLED = 240,
    KOGMAW = 96,
    KSANTE = 897,
    LEBLANC = 7,
    LEESIN = 64,
    LEONA = 89,
    LILLIA = 876,
    LISSANDRA = 127,
    LUCIAN = 236,
    LULU = 117,
    LUX = 99,
    MALPHITE = 54,
    MALZAHAR = 90,
    MAOKAI = 57,
    MASTERYI = 11,
    MISSFORTUNE = 21,
    MONKEYKING = 62,
    MORDEKAISER = 82,
    MORGANA = 25,
    NAMI = 267,
    NASUS = 75,
    NAUTILUS = 111,
    NEEKO = 518,
    NIDALEE = 76,
    NILAH = 895,
    NOCTURNE = 56,
    NUNU = 20,
    OLAF = 2,
    ORIANNA = 61,
    ORNN = 516,
    PANTHEON = 80,
    POPPY = 78,
    PYKE = 555,
    QIYANA = 246,
    QUINN = 133,
    RAKAN = 497,
    RAMMUS = 33,
    REKSAI = 421,
    RELL = 526,
    RENATAGLASC = 888,
    RENEKTON = 58,
    RENGAR = 107,
    RIVEN = 92,
    RUMBLE = 68,
    RYZE = 13,
    SAMIRA = 360,
    SEJUANI = 113,
    SENNA = 235,
    SERAPHINE = 147,
    SETT = 875,
    SHACO = 35,
    SHEN = 98,
    SHYVANA = 102,
    SINGED = 27,
    SION = 14,
    SIVIR = 15,
    SKARNER = 72,
    SONA = 37,
    SORAKA = 16,
    SWAIN = 50,
    SYLAS = 517,
    SYNDRA = 134,
    TAHMKENCH = 223,
    TALIYAH = 163,
    TALON = 91,
    TARIC = 44,
    TEEMO = 17,
    THRESH = 412,
    TRISTANA = 18,
    TRUNDLE = 48,
    TRYNDAMERE = 23,
    TWISTEDFATE = 4,
    TWITCH = 29,
    UDYR = 77,
    URGOT = 6,
    VARUS = 110,
    VAYNE = 67,
    VEIGAR = 45,
    VELKOZ = 161,
    VEX = 711,
    VI = 254,
    VIEGO = 234,
    VIKTOR = 112,
    VLADIMIR = 8,
    VOLIBEAR = 106,
    WARWICK = 19,
    XAYAH = 498,
    XERATH = 101,
    XINZHAO = 5,
    YASUO = 157,
    YONE = 777,
    YORICK = 83,
    YUUMI = 350,
    ZAC = 154,
    ZED = 238,
    ZERI = 221,
    ZIGGS = 115,
    ZILEAN = 26,
    ZOE = 142,
    ZYRA = 143
}

declare enum Gamemode {
    DRAFT_PICK = 400,
    RANKED_SOLO_DUO = 420,
    BLIND_PICK = 430,
    TFT_NORMAL = 1090,
    ARAM = 450
}

declare enum Region {
    BR = "BR",
    EUW = "EUW",
    EUNE = "EUNE",
    JP = "JP",
    LA1 = "LA1",
    LA2 = "LA2",
    NA = "NA",
    OC1 = "OC1",
    RU = "RU",
    TR = "TR"
}

declare enum Role {
    FILL = "FILL",
    TOP = "TOP",
    JUNGLE = "JUNGLE",
    MID = "MIDDLE",
    ADC = "BOTTOM",
    SUPPORT = "UTILITY",
    UNSELECTED = "UNSELECTED"
}

declare enum EventCallbackName {
    VIRTUAL_CLIENT_RIOT_TOKEN = "VIRTUAL_CLIENT_RIOT_TOKEN",
    VIRTUAL_CLIENT_LOL_TOKEN = "VIRTUAL_CLIENT_LOL_TOKEN",
    VIRTUAL_CLIENT_PARTY_TOKEN = "VIRTUAL_CLIENT_PARTY_TOKEN",
    VIRTUAL_CLIENT_LOBBY_UNREGISTERED = "VIRTUAL_CLIENT_LOBBY_UNREGISTERED",
    VIRTUAL_CLIENT_LOBBY_CREATED = "VIRTUAL_CLIENT_LOBBY_CREATED",
    VIRTUAL_CLIENT_SELECT_GAMEMODE = "VIRTUAL_CLIENT_SELECT_GAMEMODE",
    VIRTUAL_CLIENT_ROLES_SELECTED = "VIRTUAL_CLIENT_ROLES_SELECTED",
    VIRTUAL_CLIENT_FINDING_MATCH = "VIRTUAL_CLIENT_FINDING_MATCH",
    VIRTUAL_CLIENT_MATCH_RESTRICTED = "VIRTUAL_CLIENT_MATCH_RESTRICTED",
    VIRTUAL_CLIENT_MATCH_ACCEPTED = "VIRTUAL_CLIENT_MATCH_ACCEPTED",
    VIRTUAL_CLIENT_USER_INFO_TOKEN = "VIRTUAL_CLIENT_USER_INFO_TOKEN",
    VIRTUAL_CLIENT_ENTITLEMENT_TOKEN = "VIRTUAL_CLIENT_ENTITLEMENT_TOKEN",
    VIRTUAL_CLIENT_QUEUE_TOKEN = "VIRTUAL_CLIENT_QUEUE_TOKEN",
    VIRTUAL_CLIENT_SESSION_TOKEN = "VIRTUAL_CLIENT_SESSION_TOKEN",
    VIRTUAL_CLIENT_GEOPASS_TOKEN = "VIRTUAL_CLIENT_GEOPASS_TOKEN",
    VIRTUAL_CLIENT_USER_DATA_TOKEN = "VIRTUAL_CLIENT_USER_DATA_TOKEN",
    VIRTUAL_CLIENT_INVENTORY_TOKEN = "VIRTUAL_CLIENT_INVENTORY_TOKEN",
    VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN = "VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN",
    VIRTUAL_CLIENT_SIPT_TOKEN = "VIRTUAL_CLIENT_SIPT_TOKEN",
    RTMP_TLS_CONNECTED = "RTMP_TLS_CONNECTED",
    RTMP_HANDSHAKE_DONE = "RTMP_HANDSHAKE_DONE",
    RTMP_HEARTBEAT = "RTMP_HEARTBEAT",
    RTMP_DSID = "RTMP_DSID",
    RTMP_GAME_STARTED = "RTMP_GAME_STARTED",
    RTMP_BANNED_CHAMPTION = "RTMP_BANNED_CHAMPTION",
    RTMP_PICKED_CHAMPTION = "RTMP_PICKED_CHAMPTION",
    RTMP_MY_TURN_TO_PICK_CHAMPTION = "RTMP_MY_TURN_TO_PICK_CHAMPTION",
    XMPP_CONNECTED = "XMPP_CONNECTED",
    XMPP_HEARTBEAT = "XMPP_HEARTBEAT",
    XMPP_DISCONNECTED = "XMPP_DISCONNECTED",
    XMPP_RECEIVED_RAW = "XMPP_RECEIVED_RAW",
    XMPP_SENT_RAW = "XMPP_SENT_RAW",
    XMPP_CHAT_RECEIVED = "XMPP_CHAT_RECEIVED"
}

type PlayerStatus = "online" | "offline" | "away";
type PlayerInfo = {
    bannerIdSelected?: string;
    challengeCrystalLevel?: string;
    challengePoints?: string;
    challengeTokensSelected?: string;
    championId: string;
    companionId?: string;
    damageSkinId?: string;
    gameMode?: string;
    gameQueueType: string;
    gameStatus: string;
    iconOverride?: string;
    isObservable?: string;
    legendaryMasteryScore: string;
    level: string;
    mapId: string;
    mapSkinId?: string;
    masteryScore?: string;
    playerTitleSelected?: string;
    profileIcon: string;
    pty?: {
        maxPlayers: number;
        partyId: string;
        queueId: number;
        summoners: number[];
    } | string;
    puuid?: string;
    queueId?: string;
    rankedPrevSeasonDivision?: string;
    rankedPrevSeasonTier?: string;
    regalia: {
        bannerType: number;
        crestType: number;
        selectedPrestigeCrest: number;
    };
    skinVariant: string;
    skinname: string;
};
type Message = {
    id: string;
    type: string;
    sender: string;
    receiver: string;
    timestamp: string;
    content: string;
};
type Friend = {
    jid: string;
    puuid: string;
    name: string;
    state: PlayerStatus;
    lastOnline: string;
    internalName: string;
    tagline: string;
    chatHistory: Message[];
};
type ChatStatus = "chat" | "away";

interface UserData {
    sub: string;
    profileIconId: number;
    level: number;
    shardId: string;
    privacy: string;
    expToNextLevel: number;
    unnamed: false;
    nameChangeFlag: false;
    accountId: number;
    name: string;
    expPoints: number;
    id: number;
    exp: number;
    iat: number;
}

declare enum SummonerSpell {
    FLASH = 14,
    IGNITE = 4
}

interface PublicTokens {
    riotToken: string;
    lolToken: string;
    entitlementsToken: string;
    userInfoToken: string;
    queueToken: string;
    sessionToken: string;
    geopasToken: string;
    siptToken: string;
    partyUserToken: string;
}

type CallbackEvent = {
    eventName: EventCallbackName;
    data?: any;
};
declare class HeadlessClient {
    private virtualClient;
    private rtmpClient;
    private xmppClient;
    private region;
    private callback;
    constructor({ region }: {
        region: Region;
    });
    listen(callback: (data: CallbackEvent) => void): void;
    login({ username, password, }: {
        username: string;
        password: string;
    }): Promise<void>;
    getAllTokens(): PublicTokens;
    getPartyId(): string;
    getCurrentUser(): UserData;
    changePartyType(type: "open" | "closed"): Promise<any>;
    addFriend({ username, tagline, }: {
        username: string;
        tagline: string;
    }): Promise<void>;
    sendMessage({ message, jid }: {
        message: string;
        jid: string;
    }): Promise<void>;
    setInfo({ status, statusMessage, playerInfo, }: {
        status: ChatStatus;
        statusMessage?: string;
        playerInfo?: PlayerInfo;
    }): Promise<void>;
    getChatHistory({ jid }: {
        jid: string;
    }): Promise<void>;
    getPlayerChampions(): Champion[];
    getFriendList(): Friend[];
    createLobby(): Promise<void>;
    selectGamemode({ gamemode }: {
        gamemode: Gamemode;
    }): Promise<void>;
    selectRoles({ roles }: {
        roles: Role[];
    }): Promise<void>;
    findMatch({ summonerSpells, }: {
        summonerSpells: SummonerSpell[];
    }): Promise<void>;
    banChampion({ champion }: {
        champion: Champion;
    }): void;
    selectChampion({ champions }: {
        champions: Champion[];
    }): void;
    logout(): Promise<void>;
    private setupVirtualClient;
    private setupRtmp;
    private setupXmpp;
}

export { type CallbackEvent, Champion, EventCallbackName, type Friend, Gamemode, HeadlessClient, type Message, type PlayerInfo, type PublicTokens, Region, Role, type UserData };

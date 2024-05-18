export enum EventCallbackName {
  VIRTUAL_CLIENT_RIOT_TOKEN = "VIRTUAL_CLIENT_RIOT_TOKEN", // string: riot token
  VIRTUAL_CLIENT_LOL_TOKEN = "VIRTUAL_CLIENT_LOL_TOKEN", // string: lol token
  VIRTUAL_CLIENT_PARTY_TOKEN = "VIRTUAL_CLIENT_PARTY_TOKEN", // string: party token
  VIRTUAL_CLIENT_LOBBY_UNREGISTERED = "VIRTUAL_CLIENT_LOBBY_UNREGISTERED", // void
  VIRTUAL_CLIENT_LOBBY_CREATED = "VIRTUAL_CLIENT_LOBBY_CREATED", // string: party id
  VIRTUAL_CLIENT_SELECT_GAMEMODE = "VIRTUAL_CLIENT_SELECT_GAMEMODE", // int: players counter
  VIRTUAL_CLIENT_ROLES_SELECTED = "VIRTUAL_CLIENT_ROLES_SELECTED", // void
  VIRTUAL_CLIENT_FINDING_MATCH = "VIRTUAL_CLIENT_FINDING_MATCH", // void
  VIRTUAL_CLIENT_MATCH_RESTRICTED = "VIRTUAL_CLIENT_MATCH_RESTRICTED", // obj: { reason, remainingMillis }
  VIRTUAL_CLIENT_MATCH_ACCEPTED = "VIRTUAL_CLIENT_MATCH_ACCEPTED", // void
  VIRTUAL_CLIENT_USER_INFO_TOKEN = "VIRTUAL_CLIENT_USER_INFO_TOKEN", // string: token
  VIRTUAL_CLIENT_ENTITLEMENT_TOKEN = "VIRTUAL_CLIENT_ENTITLEMENT_TOKEN", // string: token
  VIRTUAL_CLIENT_QUEUE_TOKEN = "VIRTUAL_CLIENT_QUEUE_TOKEN", // string: token
  VIRTUAL_CLIENT_SESSION_TOKEN = "VIRTUAL_CLIENT_SESSION_TOKEN", // string: token
  VIRTUAL_CLIENT_GEOPASS_TOKEN = "VIRTUAL_CLIENT_GEOPASS_TOKEN", // string: token
  VIRTUAL_CLIENT_USER_DATA_TOKEN = "VIRTUAL_CLIENT_USER_DATA_TOKEN", // string: token
  VIRTUAL_CLIENT_INVENTORY_TOKEN = "VIRTUAL_CLIENT_INVENTORY_TOKEN", // string: token
  VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN = "VIRTUAL_CLIENT_PLAYER_CHAMPIONS_TOKEN", // string: token
  VIRTUAL_CLIENT_SIPT_TOKEN = "VIRTUAL_CLIENT_SIPT_TOKEN", // string: token

  RTMP_TLS_CONNECTED = "RTMP_TLS_CONNECTED", // void
  RTMP_HANDSHAKE_DONE = "RTMP_HANDSHAKE_DONE", // void
  RTMP_HEARTBEAT = "RTMP_HEARTBEAT", // number: heartbeat counter
  RTMP_DSID = "RTMP_DSID", // string: rmtp dsid
  RTMP_GAME_STARTED = "RTMP_GAME_STARTED", // void
  RTMP_BANNED_CHAMPTION = "RTMP_BANNED_CHAMPTION", // string: champion name
  RTMP_PICKED_CHAMPTION = "RTMP_PICKED_CHAMPTION", // string: champion name
  RTMP_MY_TURN_TO_PICK_CHAMPTION = "RTMP_MY_TURN_TO_PICK_CHAMPTION", // void

  XMPP_CONNECTED = "XMPP_CONNECTED", // void
  XMPP_HEARTBEAT = "XMPP_HEARTBEAT", // number: heartbeat counter
  XMPP_DISCONNECTED = "XMPP_DISCONNECTED", // void
  XMPP_RECEIVED_RAW = "XMPP_RECEIVED_RAW", // string: xml data
  XMPP_SENT_RAW = "XMPP_SENT_RAW", // string: xml data
  XMPP_CHAT_RECEIVED = "XMPP_CHAT_RECEIVED", // obj: { id, from, to, stamp, type, message }
  XMPP_CHAT_HISTORY_UPDATED = "XMPP_CHAT_HISTORY_UPDATED", // obj: { chatHistory, friendJid }
  XMPP_FRIENDLIST_UPDATED = "XMPP_FRIENDLIST_UPDATED", // obj: { Friend[] }
  XMPP_PENDING_FRIENDS_UPDATED = "XMPP_PENDING_FRIENDS_UPDATED", // obj: { Friend[] }
}

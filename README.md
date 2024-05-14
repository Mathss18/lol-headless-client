<div align="center">
    <h1>LoL Headless Client</h1>
    <a href="https://www.npmjs.com/package/lol-headless-client"><img src="https://img.shields.io/npm/v/commandkit?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/lol-headless-client"><img src="https://img.shields.io/npm/dt/commandkit?maxAge=3600" alt="npm downloads" /></a>
</div>

# LoL Headless Client (LHC)

LHC is a library that connects to League Of Legends API.

#### (BETA)
- This project DOES NOT use the LCU api, so you don't need your league open to use it.

## Features

- Login
- Create Lobby
- Chat Integration
- Select Role
- Select Gamemode
- Select Summoner Spells
- Select Champion
- Ban Champion
- And much more!

## Installation

[![npm](https://nodei.co/npm/lol-headless-client.png)](https://nodei.co/npm/lol-headless-client/)

To install LHC, simply run the following command:

For npm:

```bash
npm install lol-headless-client
```

Yarn:

```bash
yarn add lol-headless-client
```

pnpm:

```bash
pnpm add lol-headless-client
```

## Usage

This is a simple overview of how to set up this library.

```js
// index.js
import { Champion, Gamemode, Region, Role, HeadlessClient } from "lol-headless-client";

const hc = new HeadlessClient({ region: Region.BR });

const main = async () => {
  await hc.login({ username: "YOUR-USERNAME", password: "YOUR-PASSWORD" }); // Login

  await hc.addFriend({ username: "FRIEND-USERNAME", tagline: "FRIEND-TAGLINE" }); // Add New Friend

  await hc.setStatus({ status: "chat" }); // Set status to online "chat"

  await hc.sendMessage({ message: "Hi", jid: "FRIEND-JID" }); // Send a message to a friend

  await hc.createLobby(); // Create a new Lobby

  await hc.selectGamemode({ gamemode: Gamemode.RANKED_SOLO_DUO }); // Select RANKED_SOLO_DUO gamemode

  await hc.selectRoles({ roles: [Role.MID, Role.TOP] }); // Select you roles

  await hc.findMatch({}); // Start to find a match

  hc.banChampion({ champion: Champion.YUUMI }); // Ban a champion

  hc.selectChampion({ champions: hc.getPlayerChampions() }); // Select a random champion
};
main();
```

## Support and Suggestions

You can hit me up on [Discord](https://discord.gg/SKSAn7EpX5).

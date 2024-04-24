# LoL Headless Client
This is a virtual client for league of legends made with NodeJs.
#### (BETA)
- This project DOES NOT use the LCU api, so you don't need your league open to use it.


## Author

- [@Mathss18](https://github.com/Mathss18)


## Stacks

**Back-end:** Node, Axios and Typescript

## Instalation

The API was made using NodeJs
- (NodeJs version ^14)

Clone the project
```bash
 git clone https://github.com/Mathss18/lol-headless-client
```

Go to the lol-headless-client folder
```bash
  cd lol-headless-client
```

Create `.env` from `.env.example` and set variables
```bash
  cp .env.example .env
```

Install project's dependencies
```bash
  npm install
```

You can also run the project with command line args
```bash
  npm start -- --user=YOUR-USERNAME --pass=YOUR-PASSWORD
```

## Headless Client Features

- Login
- Create Lobby
- Select Roles
- Find Match
- Ban Champion
- Pick and Select Champion

### Supported Regions (change it in .env)
**BR, EUW, EUNE, JP, LA1, LA2, NA, OC1, RU, TR**

**PS: This BETA version, it does not have a GUI. I'll implement that in the future. For more info, contact me in discord: mathss7**

## Screenshots

**Console Info**
![App Screenshot](https://i.imgur.com/ECgfXvl.png)


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Intents } = require('discord.js');
const DiscordJS = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    let handler = require('./command-handler');
    if (handler.default)
        handler = handler.default;
    handler(client);
});
client.login(process.env.TOKEN);

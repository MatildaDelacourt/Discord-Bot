const DiscordJS = require('discord.js');
//const Intents = DiscordJS.intents;
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
//import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message: any) => {
  if (message.content === 'ping')
    message.reply({
      content: 'pong',
    });
});

client.login(process.env.TOKEN);

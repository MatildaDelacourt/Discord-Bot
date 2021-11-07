// importing separate cowsay functionalitys and discord files
import cowsay from './utils/cowsay';
const { Intents } = require('discord.js');
const DiscordJS = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

// creates client
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// lets you know when the bot is ready
client.on('ready', () => {
  console.log('The bot is ready');
});

//Create message, if message is cowsay give a reaction or a reply
//and catch error if there is any.
client.on('messageCreate', (message: any) => {
  if (message.content === 'cowsay') {
    message.react('🚔').then(console.log).catch(console.error);
    const output = cowsay();
    message
      .reply(output)
      .then(function (response: any) {
        console.log(`Replied to message "${message.content}"`);
      })
      .catch(function (response: any) {
        if (response['httpStatus'] == 400) {
          message.reply('ERROR: image is too big');
        }
      });
  }
});
// login bot
client.login(process.env.TOKEN);

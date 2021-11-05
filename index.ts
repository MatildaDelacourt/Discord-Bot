const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const cowsay = require('cowsay');

let output: string = cowsay.say({ text: 'Hello from typescript!' });

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message: any) => {
  if (message.content === 'ping')
    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);

  if (message.content === 'cowsay')
    message
      .reply(
        `
    \`\`\`
      ${output}
    \`\`\`
    `
      )
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);

  // React to a message
  message.react('🚔').then(console.log).catch(console.error);
});
client.login(process.env.TOKEN);

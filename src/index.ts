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
  let handler = require('./command-handler');
  if (handler.default) handler = handler.default;
  handler(client);
  //console.log('The bot is ready');
});

//Create message, if message is cowsay give a reaction or a reply
//and catch error if there is any.
// client.on('messageCreate', (message: any) => {
//   if (message.content === 'ping')
//     message.reply({
//       content: 'pong',
//     });
//   if (!message.content.startsWith(PREFIX)) return;
//   // Checks the first 3 characters of the message.content
//   //console.log('no return: ', message.content);
//   const args = message.content
//     .toLowerCase()
//     .substring(PREFIX.length)
//     .slice()
//     .split(/ /)[2];
//   // Valid commands
//   let validCommands = [
//     'cat',
//     'atom',
//     'maze-runner',
//     'snoopy',
//     'taxi',
//     'banana',
//   ];
//   // Checking to see that the argument after md# cowsay matches the accepted faces and is valid.
//   const isValid = validCommands.includes(args);

//   console.log('isValid: ', isValid);
//   // Print out error if command is not valid.
//   if (!isValid) {
//     message.reply(
//       'ERROR: valid commands are cat, atom, maze-runner, snoopy, taxi and banana ONLY'
//     );
//     console.log(`You entered an unknown command.`);
//     return;
//   }
//   // reaction to a message
//   message.react('🚔').then(console.log).catch(console.error);
//   // taking a variable for cowsay function
//   const output = cowsay(String(args));
//   // reply to message and catching error if there is any
//   message
//     .reply(
//       `
//     \`\`\`
//     ${output}
//     \`\`\`
//     `
//     )
//     .then(function (response: any) {
//       console.log(`Replied to message "${message.content}"`);
//     })
//     .catch(function (response: any) {
//       if (response['httpStatus'] == 400) {
//         message.reply('ERROR: image is too big');
//       }
//     });
// });
// login bot
client.login(process.env.TOKEN);

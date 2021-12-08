// DEFAULT IMPORTS FOR JS:
// const fs = requier('fs')
// const getFiles = require('./get-files')

// DEFAULT IMPORT FOR TS:
import { Client, Message } from 'discord.js';
import getFiles from './get-files';
import dotenv from 'dotenv';

dotenv.config();

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

// Getting the prefix
const PREFIX = String(process.env.PREFIX);
//console.log('prefix: ', PREFIX.length);

// Adding the channel
const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
//console.table(channels);

// JS:
// module.exports = (client) => {}

// TS:
export default (client: Client) => {
  //JS:
  // const commands = {}

  //TS:
  const commands = {} as {
    [key: string]: any;
  };

  //const suffix = '.ts'; // Use '.js' if you are using Javascript

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;
  }

  console.log(commands);

  client.on('messageCreate', (message) => {
    console.log(message.content);
    if (!channels.includes(message.channel.id))
      //console.log('testing: ', message.content);
      return;
    if (message.author.bot || !message.content.startsWith(PREFIX)) {
      return;
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) {
      return;
    }
    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const get_files_1 = (0, tslib_1.__importDefault)(require('./get-files'));
const dotenv_1 = (0, tslib_1.__importDefault)(require('dotenv'));
dotenv_1.default.config();
let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}
const PREFIX = String(process.env.PREFIX);
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}
const channels = CHANNELS.split(',');
exports.default = (client) => {
  const commands = {};
  const commandFiles = (0, get_files_1.default)(src, './commands', suffix);
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
    if (!channels.includes(message.channel.id)) return;
    if (message.author.bot || !message.content.startsWith(PREFIX)) {
      return;
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
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

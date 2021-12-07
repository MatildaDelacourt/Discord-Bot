"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay_1 = (0, tslib_1.__importDefault)(require("./utils/cowsay"));
const { Intents } = require('discord.js');
const DiscordJS = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const PREFIX = String(process.env.PREFIX);
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id))
        return;
    if (message.content === 'ping')
        message.reply({
            content: 'pong',
        });
    if (!message.content.startsWith(PREFIX))
        return;
    const args = message.content
        .toLowerCase()
        .substring(PREFIX.length)
        .slice()
        .split(/ /)[2];
    let validCommands = [
        'cat',
        'atom',
        'maze-runner',
        'snoopy',
        'taxi',
        'banana',
    ];
    const isValid = validCommands.includes(args);
    console.log('isValid: ', isValid);
    if (!isValid) {
        message.reply('ERROR: valid commands are cat, atom, maze-runner, snoopy, taxi and banana ONLY');
        console.log(`You entered an unknown command.`);
        return;
    }
    message.react('🚔').then(console.log).catch(console.error);
    const output = (0, cowsay_1.default)(String(args));
    message
        .reply(`
    \`\`\`
    ${output}
    \`\`\`
    `)
        .then(function (response) {
        console.log(`Replied to message "${message.content}"`);
    })
        .catch(function (response) {
        if (response['httpStatus'] == 400) {
            message.reply('ERROR: image is too big');
        }
    });
});
client.login(process.env.TOKEN);

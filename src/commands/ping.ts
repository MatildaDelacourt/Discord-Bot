import { Message } from 'discord.js';

//JS
// module.exports = {}

// TS:
export default {
  callback: (message: Message, ...args: string[]) => {
    console.log(args);
    message.reply('pong');
  },
};

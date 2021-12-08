import { Message } from 'discord.js';

// JS:
// module.exports = {}

// TS:
export default {
  callback: (message: Message, ...args: string[]) => {
    let sum = 0;

    for (const arg of args) {
      sum += parseInt(arg);
    }

    message.reply(`The sum is ${sum}`);
  },
};

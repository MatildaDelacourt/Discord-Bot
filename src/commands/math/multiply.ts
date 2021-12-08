import { Message } from 'discord.js';

// JS:
// module.exports = {}

// TS:
export default {
  callback: (message: Message, ...args: string[]) => {
    let sum = 1;

    for (const arg of args) {
      sum *= parseInt(arg);
    }

    message.reply(`The sum is ${sum}`);
  },
};

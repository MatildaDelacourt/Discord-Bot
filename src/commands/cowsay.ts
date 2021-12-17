// IMPORTS
import { Message } from 'discord.js';
const cowsay = require('cowsay');
const IOptions = require('cowsay');
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { openStdin } from 'process';

export default {
  callback: (message: Message, ...args: string[]) => {
    let face = args[0];
    //Getting a random value from 0 to 25. The length of quotes array.
    let rando = getRandomInt(0, 25);
    //import { iOptions } for cowsay
    let opts: typeof IOptions = {
      //Getting the random quote and author. Changes cow face.
      text: quotes[rando].quote + ' - ' + quotes[rando].author,
      e: '^^',
      r: true,
    };
    if (face) {
      opts.r = false;
      opts.f = face;
    }
    //new cow
    let output: string;
    try {
      output = cowsay.say(opts);
    } catch (error) {
      message.reply('Sorry that cow does not exist.');
      return;
    }
    output = output.replace(/\`/g, "'");
    // reply to message and catching error if there is any
    message
      .reply(
        `
    \`\`\`
    ${output}
    \`\`\`
    `
      )
      .then(function (response: any) {
        console.log(`Replied to message "${message.content}"`);
      });

    console.log(args);
    //message.reply(output);
  },
};

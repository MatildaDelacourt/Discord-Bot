// IMPORTS
import { Message, MessageEmbed } from 'discord.js';
import { deflateSync } from 'zlib';
import quotes from '../utils/quotes.json';
const IOptions = require('cowsay');
const cowsay = require('cowsay');
import getRandomInt from '../utils/random';

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
    output = `
    \`\`\`
    ${output}
    \`\`\`
    `;
    // inside a command
    //
    const cowbarnEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('Welcome to the Cowbarn!')
      .setURL('https://discord.js.org/')
      .setAuthor('Matilda Delacourt')
      .setDescription(output)
      //.setThumbnail('')
      .addFields(
        { name: 'Wazza!', value: 'Hope you are enjoying your day' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Moo!', value: 'Check out some cows!', inline: true }
      )
      //.addField('Inline field title', 'Some value here', true)
      .setTimestamp()
      .setFooter('Hope you enjoy the Cowbarn');

    message.reply({ embeds: [cowbarnEmbed] });
  },
};

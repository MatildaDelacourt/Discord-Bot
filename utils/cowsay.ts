//imports
const cowsay = require('cowsay');
const IOptions = require('cowsay');
import getRandomInt from './random';
import quotes from './quotes.json';

//export cowsay
export default function () {
  //Getting a random value from 0 to 25. The length of quotes array.
  let rando = getRandomInt(0, 25);
  //import { iOptions } for cowsay
  let opts: typeof IOptions = {
    //Getting the random quote, author and image.
    text: quotes[rando].quote + ' - ' + quotes[rando].author,
    e: '^^',
    r: true,
    //f: '',
  };

  //new cow
  let output: string = cowsay.say(opts);
  console.log(output);

  //returns the cow
  return output;
}

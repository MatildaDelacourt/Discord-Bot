//imports
const cowsay = require('cowsay');
const IOptions = require('cowsay');
import getRandomInt from './random';
import quotes from './quotes.json';

//export cowsay
export default function (face: String) {
  //Getting a random value from 0 to 25. The length of quotes array.
  let rando = getRandomInt(0, 25);
  //import { iOptions } for cowsay
  let opts: typeof IOptions = {
    //Getting the random quote and author. Changes cow face.
    text: quotes[rando].quote + ' - ' + quotes[rando].author,
    e: '^^',
    r: false,
    f: face,
  };

  //new cow
  let output: string = cowsay.say(opts);

  //returns the cow
  return output;
}

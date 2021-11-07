//imports
const cowsay = require('cowsay');
const IOptions = require('cowsay');
const dotenv = require('dotenv');

dotenv.config();

//export cowsay
export default function () {
  //let output: string = cowsay.say({ text: 'Hello from typescript!' });

  //import { iOptions } for cowsay
  let opts: typeof IOptions = {
    text: 'Hello from TypeScript!',
    e: '^^',
    r: true,
    //f: '',
  };

  //new cow

  let output: string = cowsay.say(opts);
  console.log(output);

  return output;
}

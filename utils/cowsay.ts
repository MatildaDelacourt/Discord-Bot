//imports
const cowsay = require('cowsay');
const IOptions = require('cowsay');

//export cowsay
export default function () {
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

  //returns the cow
  return output;
}

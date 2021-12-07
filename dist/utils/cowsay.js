"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = require('cowsay');
const IOptions = require('cowsay');
const random_1 = (0, tslib_1.__importDefault)(require("./random"));
const quotes_json_1 = (0, tslib_1.__importDefault)(require("./quotes.json"));
function default_1(face) {
    let rando = (0, random_1.default)(0, 25);
    let opts = {
        text: quotes_json_1.default[rando].quote + ' - ' + quotes_json_1.default[rando].author,
        e: '^^',
        r: false,
        f: face,
    };
    let output = cowsay.say(opts);
    return output;
}
exports.default = default_1;

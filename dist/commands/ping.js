"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        console.log(args);
        message.reply('pong');
    },
};

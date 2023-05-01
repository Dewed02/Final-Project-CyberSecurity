"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputNumber = exports.userInputString = void 0;
const readline_1 = __importDefault(require("readline"));
const userInputString = async () => {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question('', (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};
exports.userInputString = userInputString;
const userInputNumber = async () => {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question('', (answer) => {
            resolve(Number(answer));
            rl.close();
        });
    });
};
exports.userInputNumber = userInputNumber;
//# sourceMappingURL=input.js.map
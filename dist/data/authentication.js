"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.financialAuthentication = exports.standardAuthentication = void 0;
const readline = __importStar(require("readline"));
const database_1 = require("./database");
const standardAuthentication = async (username) => {
    const password = await readPassIn("Enter your password: ");
    const db = await (0, database_1.connect)();
    let pass = await db.get(`SELECT password FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    if (password !== pass.password) {
        throw new Error("Invalid password");
    }
    else {
        return true;
    }
};
exports.standardAuthentication = standardAuthentication;
const financialAuthentication = async (username) => {
    const password = await readPassIn("Enter your password: ");
    const db = await (0, database_1.connect)();
    let pass = await db.get(`SELECT password FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    console.log(pass.password);
    if (password !== pass.password) {
        throw new Error("Invalid password");
    }
    let financialPassword = await readPassIn("Enter your financial password: ");
    let financialPass = await db.get(`SELECT financialPassword FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    console.log(financialPass.financialPassword);
    if (financialPassword !== financialPass.financialPassword) {
        console.log('Invalid financial password');
        throw new Error("Invalid financial password");
    }
    else {
        return true;
    }
};
exports.financialAuthentication = financialAuthentication;
// Borrowed from deaddrop project
const readPassIn = (query) => {
    return new Promise((resolve, _) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const stdin = process.openStdin();
        process.stdin.on("data", (char) => {
            let str = char + "";
            switch (str) {
                case "\n":
                case "\r":
                case "\u0004":
                    stdin.pause();
                    break;
                default:
                    readline.clearLine(process.stdout, 0);
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(query + Array(rl.line.length + 1).join("*"));
                    break;
            }
        });
        rl.question(query, (value) => {
            resolve(value);
        });
    });
};
//# sourceMappingURL=authentication.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs_1 = require("fs");
const process_1 = require("process");
const sqlite_1 = require("sqlite");
const schema = `
CREATE TABLE PersonalInfo (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE LoginInfo (
    id INTEGER NOT NULL,
    userName TEXT NOT NULL,
    password TEXT NOT  NULL
);

CREATE TABLE Checkings (
    id INTEGER NOT NULL,
    accountNumber INTEGER NOT NULL,
    balance REAL NOT NULL
);

CREATE TABLE Savings (
    id INTEGER NOT NULL,
    accountNumber INTEGER NOT NULL,
    balance REAL NOT NULL
);`;
// Borrowed from input validation assignment 
const connect = async () => {
    try {
        let mustInitDb = false;
        if (!(0, fs_1.existsSync)("dd.db")) {
            mustInitDb = true;
        }
        return await (0, sqlite_1.open)({
            filename: "dd.db",
            driver: sqlite3_1.default.Database,
        }).then(async (db) => {
            if (mustInitDb) {
                await db.exec(schema);
            }
            return db;
        }).then(async (db) => await db);
    }
    catch (error) {
        console.error(error);
        (0, process_1.exit)();
    }
};
exports.connect = connect;
//# sourceMappingURL=database.js.map
import sqlite3 from 'sqlite3';
import { existsSync } from 'fs';
import { exit } from 'process';
import { Database, open } from 'sqlite';


const schema :string = `
CREATE TABLE PersonalInfo (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE LoginInfo (
    id INTEGER NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT  NULL
);

CREATE TABLE Checkings (
    id INTEGER NOT NULL,
    accountnumber INTEGER NOT NULL,
    balance REAL NOT NULL
);

CREATE TABLE Savings (
    id INTEGER NOT NULL,
    accountNumber INTEGER NOT NULL,
    balance REAL NOT NULL
);`

// Borrowed from input validation assignment 
export const connect = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
    try {
        let mustInitDb = false;
        if (!existsSync("dd.db")) {
            mustInitDb = true;
        }

        return await open({
            filename: "dd.db",
            driver: sqlite3.Database,
        }).then(async (db) => {
            if (mustInitDb) {
                await db.exec(schema);
            }
            return db;
        }).then(async (db) => await db);

    } catch (error) {
        console.error(error)
        exit();
    }
}
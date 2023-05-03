"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingBalance = exports.depositChecking = exports.withdrawChecking = exports.createCheckings = void 0;
const authentication_1 = require("./authentication");
const input_1 = require("./input");
const authentication_2 = require("./authentication");
const database_1 = require("./database");
const createCheckings = async (username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_2.isLoggedIn)(username)) {
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    console.log("made it past auth");
    let userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    console.log(userID);
    let existingAccount = await db.get(`SELECT id FROM Checkings WHERE id = :id`, {
        ':id': userID.id
    });
    console.log(existingAccount);
    if (existingAccount) {
        throw new Error("User already has a checking account");
    }
    let balance = await (0, input_1.userInputNumber)("Enter initial balance: ");
    if (balance < 200) {
        throw new Error("Initial balance must be at least $200");
    }
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    await db.run(`INSERT INTO Checkings (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
        ':id': userID.id,
        ':accountNumber': accountNumber,
        ':balance': balance
    });
};
exports.createCheckings = createCheckings;
const withdrawChecking = async (amount, username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_2.isLoggedIn)(username)) {
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    const balance = await db.get(`SELECT balance FROM Checkings WHERE id = :id`, {
        ':id': userID.id
    });
    if (amount > balance.balance) {
        throw new Error("Insufficient funds");
    }
    await db.run(`UPDATE Checkings SET balance = balance - :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
};
exports.withdrawChecking = withdrawChecking;
const depositChecking = async (amount, username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_2.isLoggedIn)(username)) {
        console.log("something went wrong");
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    await db.run(`UPDATE Checkings SET balance = balance + :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
};
exports.depositChecking = depositChecking;
const checkingBalance = async (username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_2.isLoggedIn)(username)) {
        console.log("something went wrong");
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    const balance = await db.get(`SELECT balance FROM Checkings WHERE id = :id`, {
        ':id': userID.id
    });
    return balance.balance;
};
exports.checkingBalance = checkingBalance;
//# sourceMappingURL=checkings.js.map
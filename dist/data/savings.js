"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savingsBalance = exports.depositSavings = exports.withdrawSavings = exports.createSavings = void 0;
const database_1 = require("./database");
const authentication_1 = require("./authentication");
const input_1 = require("./input");
const authentication_2 = require("./authentication");
const createSavings = async (username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_1.isLoggedIn)(username)) {
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_2.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    let userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    let existingAccount = await db.get(`SELECT id FROM Savings WHERE id = :id`, {
        ':id': userID.id
    });
    if (existingAccount) {
        throw new Error("User already has a savings account");
    }
    let balance = await (0, input_1.userInputNumber)("Enter initial balance: ");
    if (balance < 200) {
        throw new Error("Initial balance must be at least $200");
    }
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    await db.run(`INSERT INTO Savings (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
        ':id': userID.id,
        ':accountNumber': accountNumber,
        ':balance': balance
    });
};
exports.createSavings = createSavings;
const withdrawSavings = async (amount, username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_1.isLoggedIn)(username)) {
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_2.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    const balance = await db.get(`SELECT balance FROM Savings WHERE id = :id`, {
        ':id': userID.id
    });
    if (amount > balance.balance) {
        throw new Error("Insufficient funds");
    }
    await db.run(`UPDATE Savings SET balance = balance - :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
};
exports.withdrawSavings = withdrawSavings;
const depositSavings = async (amount, username) => {
    if (!await (0, authentication_2.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const db = await (0, database_1.connect)();
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    await db.run(`UPDATE Savings SET balance = balance + :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
};
exports.depositSavings = depositSavings;
const savingsBalance = async (username) => {
    const db = await (0, database_1.connect)();
    if (!await (0, authentication_1.isLoggedIn)(username)) {
        throw new Error("User is not logged in");
    }
    if (!await (0, authentication_2.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    const balance = await db.get(`SELECT balance FROM Savings WHERE id = :id`, {
        ':id': userID.id
    });
    return balance.balance;
};
exports.savingsBalance = savingsBalance;
//# sourceMappingURL=savings.js.map
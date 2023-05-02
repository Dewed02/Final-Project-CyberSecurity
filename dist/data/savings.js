"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savingsBalance = exports.depositSavings = exports.withdrawSavings = void 0;
const database_1 = require("./database");
const authentication_1 = require("./authentication");
const withdrawSavings = async (amount, username) => {
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const db = await (0, database_1.connect)();
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
    if (!await (0, authentication_1.financialAuthentication)(username)) {
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
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const db = await (0, database_1.connect)();
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
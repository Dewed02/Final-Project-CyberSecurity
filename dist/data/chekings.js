"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawChecking = void 0;
const authentication_1 = require("./authentication");
const database_1 = require("./database");
const withdrawChecking = async (amount, username) => {
    if (!await (0, authentication_1.financialAuthentication)(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }
    const db = await (0, database_1.connect)();
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    const balance = await db.get(`SELECT balance FROM Checking WHERE id = :id`, {
        ':id': userID.id
    });
    if (amount > balance.balance) {
        throw new Error("Insufficient funds");
    }
    await db.run(`UPDATE Checking SET balance = balance - :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
};
exports.withdrawChecking = withdrawChecking;
//# sourceMappingURL=chekings.js.map
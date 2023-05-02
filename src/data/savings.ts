import { connect } from './database';
import { financialAuthentication } from './authentication';

export const withdrawSavings = async (amount: number, username: string) => {
    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const db = await connect();
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
}

export const depositSavings = async (amount: number, username: string) => {
    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const db = await connect();
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    await db.run(`UPDATE Savings SET balance = balance + :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
}

export const savingsBalance = async (username: string) => {
    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const db = await connect();
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    const balance = await db.get(`SELECT balance FROM Savings WHERE id = :id`, {
        ':id': userID.id
    });

    return balance.balance;
}


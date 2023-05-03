import { connect } from './database';
import { isLoggedIn } from './authentication';
import { userInputNumber } from './input';
import { financialAuthentication } from './authentication';

export const createSavings = async (username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    let userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    
    let existingAccount = await db.get(`SELECT id FROM Savings WHERE id = :id`, { 
        ':id': userID.id
    });

    if(existingAccount) {
        throw new Error("User already has a savings account");
    }

    let balance: number = await userInputNumber("Enter initial balance: ");

    if(balance < 200) {
        throw new Error("Initial balance must be at least $200");
    }

    let accountNumber = Math.floor(Math.random() * 1000000000) + 1;

    await db.run(`INSERT INTO Savings (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
        ':id': userID.id,
        ':accountNumber': accountNumber,
        ':balance': balance
    });
}

export const withdrawSavings = async (amount: number, username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
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
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

   
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    const balance = await db.get(`SELECT balance FROM Savings WHERE id = :id`, {
        ':id': userID.id
    });

    return balance.balance;
}


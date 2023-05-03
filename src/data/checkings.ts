import { financialAuthentication } from './authentication';
import { userInputNumber } from './input';
import { isLoggedIn } from './authentication';
import { connect } from './database';

export const createCheckings = async (username: string) => {
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
    
    let existingAccount = await db.get(`SELECT id FROM Checking WHERE id = :id`, {
        ':id': userID.id
    });
    console.log("made it past second query");
    if(existingAccount) {
        throw new Error("User already has a checking account");
    }
    
    let balance: number = await userInputNumber("Enter initial balance: ");
    
    if(balance < 200) {
        throw new Error("Initial balance must be at least $200");
    }

    let accountNumber = Math.floor(Math.random() * 1000000000) + 1;

    await db.run(`INSERT INTO Checking (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
        ':id': userID.id,
        ':accountNumber': accountNumber,
        ':balance': balance
    });
}



export const withdrawChecking = async (amount: number, username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        console.log("something went wrong");
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    
    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    console.log(userID);
    const balance = await db.get(`SELECT balance FROM Checking WHERE id = :id`, {
        ':id': userID.id
    });
    console.log(balance);
    if (amount > balance.balance) {
        throw new Error("Insufficient funds");
    }
    console.log("made it past balance check");
    await db.run(`UPDATE Checking SET balance = balance - :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });

   
}

export const depositChecking = async (amount: number, username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        console.log("something went wrong");
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    await db.run(`UPDATE Checking SET balance = balance + :amount WHERE id = :id`, {
        ':amount': amount,
        ':id': userID.id
    });
}

export const checkingBalance = async (username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        console.log("something went wrong");
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    const balance = await db.get(`SELECT balance FROM Checking WHERE id = :id`, {
        ':id': userID.id
    });

    return balance.balance;
}


import { financialAuthentication } from './authentication';
import { connect } from './database';

export const withdrawChecking = async (amount: number, username: string) => {
    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    const db = await connect();
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

   
}


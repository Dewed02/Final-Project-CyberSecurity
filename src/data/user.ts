import { connect } from './database';
import { userInputString, userInputNumber } from './input'; 
import * as EmailValidator from 'email-validator';

export const newUser = async (username: string) => {
    const db = await connect();
    let userExists = await db.get(`SELECT * FROM LoginInfo WHERE userName = :userName`, {
        ':userName': username
    });
    if (userExists) {
        throw new Error("Username already exists");
    }

    let password = await userInputString("Please enter a password:");

    let existingPassword = await db.get(`SELECT * FROM LoginInfo WHERE password = :password`, {
        ':password': password
    });
    if (existingPassword) {
        throw new Error("Password already exists");
    }
    else {
        var id = Math.floor(Math.random() * 9000000000) + 1000000000;
        let financialPassword = await userInputString("Please enter a financial password:");
        await db.run(`INSERT INTO LoginInfo (id, userName, password, financialpassword) 
        VALUES (:id, :userName, :password, :financialpassword)`, {
            ':id': id,
            ':userName': username,
            ':password': password,
            ':financialpassword': financialPassword
        });
    }

    return enterAccountInfo(id);
}

export const enterAccountInfo = async (id: number) => {
    const db = await connect();
    let name = await userInputString("Please enter your name: ");
    let address = await userInputString("Please enter your address: ");
    let email = await userInputString("Please enter your email: ");
    console.log(!EmailValidator.validate(email));
    if(!EmailValidator.validate(email)) {
        throw new Error("Invalid email");
    }
    await db.run(`INSERT INTO PersonalInfo (id, name, address, email) VALUES (:id, :name, :address, :email)`, {
        ':id': id,
        ':name': name,
        ':address': address,
        ':email': email
    });

    
    let accountType = await userInputString("Please enter your account type (savings or checkings): ");
    let balance = await userInputNumber("Please enter your balance: ");
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    if (accountType === "savings") {
        await db.run(`INSERT INTO Savings (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
            ':id': id,
            ':accountNumber': accountNumber,
            ':balance': balance
        });
    }
    else if (accountType === "checkings") {
    await db.run(`INSERT INTO Checkings (id, accountNumber, balance) VALUES (:id, :accountNumber, :balance)`, {
        ':id': id,
        ':accountNumber': accountNumber,
        ':balance': balance
    });
    }   
    else {
        throw new Error("Invalid account type");
    }
    return accountNumber;
}


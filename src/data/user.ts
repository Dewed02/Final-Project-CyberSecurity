import { connect } from './database';
import { userInputString, userInputNumber } from './input'; 
import { financialAuthentication, isLoggedIn, standardAuthentication } from './authentication';
import * as EmailValidator from 'email-validator';
import { sha256 } from 'js-sha256';

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
        let securityQuestion = await userInputString("Please enter a security question " +
        "(i.e. mother's maiden name, first concert, etc. something that you will remember)): ");

        password = sha256(password);
        financialPassword = sha256(financialPassword);
        securityQuestion = sha256(securityQuestion);
        await db.run(`INSERT INTO LoginInfo (id, userName, password, financialpassword, securityQuestion, loggedIn) 
        VALUES (:id, :userName, :password, :financialpassword, :securityQuestion, 0)`, {
            ':id': id,
            ':userName': username,
            ':password': password,
            ':financialpassword': financialPassword,
            ':securityQuestion': securityQuestion,
        });
    }

    return enterAccountInfo(id);
}

export const enterAccountInfo = async (id: number) => {
    const db = await connect();
    let name = await userInputString("Please enter your name: ");
    let address = await userInputString("Please enter your address: ");
    let email = await userInputString("Please enter your email: ");
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

export const viewPersonalInfo = async (username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await standardAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    let id = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    let personalInfo = await db.get(`SELECT * FROM PersonalInfo WHERE id = :id`, {
        ':id': id.id
    });
    return personalInfo;
}

export const updateAddress = async (username: string, address:string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await standardAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    let id = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    await db.run(`UPDATE PersonalInfo SET address = :address WHERE id = :id`, {
        ':id': id.id,
        ':address': address
    });
}

export const changePassword = async (username: string) => {
    const db = await connect();
    if(!await isLoggedIn(username)) {
        throw new Error("User is not logged in");
    }

    if(!await financialAuthentication(username)) {
        throw new Error("Unsuccessful authentication attempt");
    }

    let securityQuestion = await userInputString("Please answer the security question: ");
    securityQuestion = sha256(securityQuestion);
    let secQuestion = await db.get(`SELECT securityQuestion FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    if (securityQuestion !== secQuestion.securityQuestion) {
        throw new Error("Incorrect security question answer");
    }

    let id = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    let newPassword = await userInputString("Please enter a new password: ");
    newPassword = sha256(newPassword);
    await db.run(`UPDATE LoginInfo SET password = :password WHERE id = :id`, {
        ':id': id.id,
        ':password': newPassword
    });
}

 
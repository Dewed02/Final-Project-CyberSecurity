import * as readline from "readline";
import { connect } from "./database";
import { sha256 } from "js-sha256";

export const standardAuthentication = async (username: string): Promise<Boolean> => {
    let password: string = await readPassIn("Enter your password: ");
    password = sha256(password);
    const db = await connect();
    let pass = await db.get(`SELECT password FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    if (password !== pass.password) {
        throw new Error("Invalid password");
    }
    else {
        return true;
    }
}

export const financialAuthentication = async (username: string): Promise<Boolean> => {
    let password: string = await readPassIn("Enter your password: ");
    password = sha256(password);
    const db = await connect();
    let pass = await db.get(`SELECT password FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    if (password !== pass.password) {
        throw new Error("Invalid password");
    }
    let financialPassword: string = await readPassIn("Enter your financial password: ");
    financialPassword = sha256(financialPassword);
    let financialPass = await db.get(`SELECT financialPassword FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
   
    if (financialPassword !== financialPass.financialPassword) {
        throw new Error("Invalid financial password");
    }
    else {
        return true;
    }
}

export const login = async (username: string) => {  
    const db = await connect();
    let userID = await db.get(`SELECT id FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    if (!userID) {
        throw new Error("Username does not exist");
    }
    let password = await readPassIn("Please enter your password: ");
    password = sha256(password);
    let existingPassword = await db.get(`SELECT * FROM LoginInfo WHERE password = :password`, {
        ':password': password
    });
    if (password !== existingPassword.password) {
        throw new Error("Incorrect password");
    }
    let loggedIn = await db.get(`SELECT loggedIn from LoginInfo where username = :username`, {
        ':username': username
    });
    if (loggedIn.loggedIn) {
        throw new Error("User is already logged in");
    }
    else {
        await db.run(`UPDATE LoginInfo SET loggedIn = 1 WHERE username = :username`, {
            ':username': username
        });
    }
    return userID.id;

}

export const logout = async (username: string) => {
    const db = await connect();
    let loggedIn = await db.get(`SELECT loggedIn from LoginInfo where username = :username`, {
        ':username': username
    });
    if (!loggedIn.loggedIn) {
        throw new Error("User is not logged in");
    }
    else {
        await db.run(`UPDATE LoginInfo SET loggedIn = 0 WHERE username = :username`, {
            ':username': username
        });
    }
}

export const isLoggedIn = async (username: string): Promise<Boolean> => {
    const db = await connect();
    let userExists = await db.get(`SELECT * FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
    if (!userExists) {
        throw new Error("Username does not exist");
    }

    let loggedIn = await db.get(`SELECT loggedIn from LoginInfo where username = :username`, {
        ':username': username
    });
    if (!loggedIn.loggedIn) {
        throw new Error("User is not logged in");
    }
    else {
        return true;
    }
}

    
// Borrowed from deaddrop project
const readPassIn = (query: string): Promise<string> => {
    return new Promise((resolve, _) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const stdin = process.openStdin();
        process.stdin.on("data", (char) => {
            let str: string = char + "";
            switch (str) {
                case "\n":
                case "\r":
                case "\u0004":
                    stdin.pause();
                    break;
                default:
                    readline.clearLine(process.stdout, 0);
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(query + Array(rl.line.length + 1).join("*"));
                    break;
            }
        });
        rl.question(query, (value) => {
            resolve(value);
        });
    });
}
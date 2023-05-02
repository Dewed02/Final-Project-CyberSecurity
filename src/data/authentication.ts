import * as readline from "readline";
import { connect } from "./database";

export const standardAuthentication = async (username: string): Promise<Boolean> => {
    const password: string = await readPassIn("Enter your password: ");
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
    const password: string = await readPassIn("Enter your password: ");
    const db = await connect();
    let pass = await db.get(`SELECT password FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });

    if (password !== pass.password) {
        throw new Error("Invalid password");
    }
    let financialPassword: string = await readPassIn("Enter your financial password: ");
    let financialPass = await db.get(`SELECT financialPassword FROM LoginInfo WHERE username = :username`, {
        ':username': username
    });
   
    if (financialPassword !== financialPass.financialPassword) {
        console.log('Invalid financial password');
        throw new Error("Invalid financial password");
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
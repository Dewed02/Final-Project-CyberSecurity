"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterAccountInfo = exports.newUser = void 0;
const database_1 = require("./database");
const input_1 = require("./input");
// export const newUser = async (name: string, address:string, userName: string,  password: string, 
//     balance: number, email: string, accountType: string) => {
//         console.log(name, address, userName, password, balance, email, accountType);
//     const db = await connect();
//     if (balance < 200) {
//         throw new Error("Balance must be at least $200");
//     }
//     let userExists = await db.get(`SELECT * FROM LoginInfo WHERE userName = :userName AND password = :password`, {
//         ':userName': userName,
//         ':password': password
//     });
//     if (userExists) {
//         throw new Error("Username or password already exists");
//     }
//     const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!verifyEmail.test(email)) {
//         console.log('hello');
//         throw new Error("Invalid email");
//     }
//     await db.run(`INSERT INTO PersonalInfo (name, address, email) VALUES (name, address, email)`, {
//         ':name': name,
//         ':address': address,
//         ':email': email
//     });
//     return enterAccountInfo(userName, password, balance, accountType);
// }
// export const enterAccountInfo = async (userName: string, password: string, balance: number, accountType: string) => {
//     console.log(userName, password, balance, accountType);
//     const db = await connect();
//     await db.run(`INSERT INTO LoginInfo (userName, password) VALUES (userName, password)`, {
//         ':userName': userName,
//         ':password': password
//     });
//     const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
//     if (accountType === "savings") {
//         await db.run(`INSERT INTO Savings (accountNumber, balance) VALUES (accountNumber, balance)`, {
//             ':accountNumber': accountNumber,
//             ':balance': balance
//         });
//     }
//     else if (accountType === "checkings") {
//     await db.run(`INSERT INTO Checkings (accountNumber, balance) VALUES (accountNumber, balance)`, {
//         ':accountNumber': accountNumber,
//         ':balance': balance
//     });
//     }
// }
const newUser = async (username) => {
    const db = await (0, database_1.connect)();
    let userExists = await db.get(`SELECT * FROM LoginInfo WHERE userName = :userName`, {
        ':userName': username
    });
    if (userExists) {
        throw new Error("Username already exists");
    }
    console.log("Please enter a password: ");
    let password = await (0, input_1.userInputString)();
    let existingPassword = await db.get(`SELECT * FROM LoginInfo WHERE password = :password`, {
        ':password': password
    });
    if (existingPassword) {
        throw new Error("Password already exists");
    }
    else {
        await db.run(`INSERT INTO LoginInfo (userName, password) VALUES (:userName, :password)`, {
            ':userName': username,
            ':password': password
        });
    }
    console.log("Please enter your name: ");
    let name = await (0, input_1.userInputString)();
    console.log("Please enter your address: ");
    let address = await (0, input_1.userInputString)();
    console.log("Please enter your email: ");
    let email = await (0, input_1.userInputString)();
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!verifyEmail.test(email)) {
        throw new Error("Invalid email");
    }
    return (0, exports.enterAccountInfo)(name, address, email);
};
exports.newUser = newUser;
const enterAccountInfo = async (name, address, email) => {
    const db = await (0, database_1.connect)();
    await db.run(`INSERT INTO PersonalInfo (name, address, email) VALUES (:name, :address, :email)`, {
        ':name': name,
        ':address': address,
        ':email': email
    });
    console.log("Please enter your account type (savings or checkings): ");
    let accountType = await (0, input_1.userInputString)();
    console.log("Please enter your balance: ");
    let balance = await (0, input_1.userInputNumber)();
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    if (accountType === "savings") {
        await db.run(`INSERT INTO Savings (accountNumber, balance) VALUES (:accountNumber, :balance)`, {
            ':accountNumber': accountNumber,
            ':balance': balance
        });
    }
    else if (accountType === "checkings") {
        await db.run(`INSERT INTO Checkings (accountNumber, balance) VALUES (:accountNumber, :balance)`, {
            ':accountNumber': accountNumber,
            ':balance': balance
        });
    }
};
exports.enterAccountInfo = enterAccountInfo;
//# sourceMappingURL=user.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterAccountInfo = exports.newUser = void 0;
const database_1 = require("./database");
const input_1 = require("./input");
const EmailValidator = __importStar(require("email-validator"));
const newUser = async (username) => {
    const db = await (0, database_1.connect)();
    let userExists = await db.get(`SELECT * FROM LoginInfo WHERE userName = :userName`, {
        ':userName': username
    });
    if (userExists) {
        throw new Error("Username already exists");
    }
    let password = await (0, input_1.userInputString)("Please enter a password:");
    let existingPassword = await db.get(`SELECT * FROM LoginInfo WHERE password = :password`, {
        ':password': password
    });
    if (existingPassword) {
        throw new Error("Password already exists");
    }
    else {
        var id = Math.floor(Math.random() * 9000000000) + 1000000000;
        let financialPassword = await (0, input_1.userInputString)("Please enter a financial password:");
        await db.run(`INSERT INTO LoginInfo (id, userName, password, financialpassword) 
        VALUES (:id, :userName, :password, :financialpassword)`, {
            ':id': id,
            ':userName': username,
            ':password': password,
            ':financialpassword': financialPassword
        });
    }
    return (0, exports.enterAccountInfo)(id);
};
exports.newUser = newUser;
const enterAccountInfo = async (id) => {
    const db = await (0, database_1.connect)();
    let name = await (0, input_1.userInputString)("Please enter your name: ");
    let address = await (0, input_1.userInputString)("Please enter your address: ");
    let email = await (0, input_1.userInputString)("Please enter your email: ");
    console.log(!EmailValidator.validate(email));
    if (!EmailValidator.validate(email)) {
        throw new Error("Invalid email");
    }
    await db.run(`INSERT INTO PersonalInfo (id, name, address, email) VALUES (:id, :name, :address, :email)`, {
        ':id': id,
        ':name': name,
        ':address': address,
        ':email': email
    });
    let accountType = await (0, input_1.userInputString)("Please enter your account type (savings or checkings): ");
    let balance = await (0, input_1.userInputNumber)("Please enter your balance: ");
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
};
exports.enterAccountInfo = enterAccountInfo;
//# sourceMappingURL=user.js.map
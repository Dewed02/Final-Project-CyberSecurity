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
exports.savingsBalance = exports.depositSavings = exports.withdrawSavings = exports.createSavings = void 0;
const data = __importStar(require("../data"));
const fs = __importStar(require("fs"));
const createSavings = async (req, res) => {
    const { username } = req.body;
    try {
        await data.createSavings(username);
        fs.appendFile('log.txt', 'Savings account created by user ' + username + '\n', (err) => {
            if (err)
                throw err;
        });
        res.status(200).json({ message: "Savings account created" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.createSavings = createSavings;
const withdrawSavings = async (req, res) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawSavings(amount, username);
        fs.appendFile('log.txt', 'Savings account withdrawal by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err)
                throw err;
        });
        res.status(200).json({ message: "Withdrawal successful" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.withdrawSavings = withdrawSavings;
const depositSavings = async (req, res) => {
    const { amount, username } = req.body;
    try {
        await data.depositSavings(amount, username);
        fs.appendFile('log.txt', 'Savings account deposit by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err)
                throw err;
        });
        res.status(200).json({ message: "Deposit successful" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.depositSavings = depositSavings;
const savingsBalance = async (req, res) => {
    const { username } = req.body;
    try {
        const balance = await data.savingsBalance(username);
        fs.appendFile('log.txt', 'Savings account balance check by user ' + username + '\n', (err) => {
            if (err)
                throw err;
        });
        res.status(200).json({ balance: balance });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.savingsBalance = savingsBalance;
//# sourceMappingURL=savings.js.map
import { Request, Response } from "express";
import * as data from "../data";
import * as fs from "fs";

export const createSavings = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await data.createSavings(username);
        fs.appendFile('log.txt', 'Savings account created by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Savings account created"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const withdrawSavings = async (req: Request, res: Response) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawSavings(amount, username);
        fs.appendFile('log.txt', 'Savings account withdrawal by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Withdrawal successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const depositSavings = async (req: Request, res: Response) => {
    const { amount, username } = req.body;
    try {
        await data.depositSavings(amount, username);
        fs.appendFile('log.txt', 'Savings account deposit by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Deposit successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const savingsBalance = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const balance = await data.savingsBalance(username);
        fs.appendFile('log.txt', 'Savings account balance check by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({balance: balance});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}
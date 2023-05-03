import { Request, Response } from 'express';
import * as data from '../data';
import * as fs from 'fs';

export const createCheckings = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await data.createCheckings(username);
        fs.appendFile('log.txt', 'Checkings account created by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Checkings account created"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const withdrawChecking = async (req: Request, res: Response) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawChecking(amount, username);
        fs.appendFile('log.txt', 'Checkings account withdrawal by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Withdrawal successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const depositChecking = async (req: Request, res: Response) => {
    const { amount, username } = req.body;
    try {
        await data.depositChecking(amount, username);
        fs.appendFile('log.txt', 'Checkings account deposit by user ' + username + ' for $' + amount + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Deposit successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const checkingBalance = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const balance = await data.checkingBalance(username);
        fs.appendFile('log.txt', 'Checkings account balance check by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({balance: balance});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}



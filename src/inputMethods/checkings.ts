import { Request, Response } from 'express';
import * as data from '../data';

export const createCheckings = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await data.createCheckings(username);
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
        res.status(200).json({balance: balance});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}



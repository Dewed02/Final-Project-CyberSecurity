import { Request, Response } from "express";
import * as data from "../data";

export const withdrawSavings = async (req: Request, res: Response) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawSavings(amount, username);
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
        res.status(200).json({balance: balance});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}
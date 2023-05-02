import { Request, Response } from 'express';
import * as data from '../data';

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



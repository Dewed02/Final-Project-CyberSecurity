import { Request, Response } from 'express';
import { connect } from '../data/database';
import * as data from '../data/user';


// export const newUser = async (req: Request, res: Response) => {
//     const { name, address, userName, password, balance, email, accountType } = req.body;
//     try {
//         await data.newUser(name, address, userName, password, balance, email, accountType);
//         res.status(200).send("User created");
//     }
//     catch (err) {
//         if (balance < 200) {
//             const message = "Balance must be at least $200";
//             res.status(400).json({'status': 'failure', 'message': message});
//         }
//     }
// }

export const newUser = async (req: Request, res: Response) => {
    const { username }= req.body;
    try {
        await data.newUser(username);
        res.status(200).send("User created");
    }
    catch (err) {}}
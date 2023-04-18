import { Request, Response } from 'express';
import { connect } from '../data/database';
import * as data from '../data/user';


export const newUser = async (req: Request, res: Response) => {
    const { name, address, userName, password, balance, email, accountType } = req.body;
    try {
        await data.newUser(name, address, userName, password, balance, email, accountType);
        res.status(200).send("User created");
    }
    catch (error) {
        if (error.message === "Balance must be at least $200") {
            res.status(400).send({'status' : 'failure', 'message' : "Balance must be at least $200"});
        }
        else if (error.message === "Username or password already exists") {
            res.status(400).send({'status' : 'failure', 'message' : "Username or password already exists"});
        }
        else if (error.message === "Invalid email") {
            res.status(400).send({'status' : 'failure', 'message' : "Invalid email"});
        }
        else {
            res.status(500).send({'status' : 'failure', 'message' : "Internal server error"});
        }
    }
}
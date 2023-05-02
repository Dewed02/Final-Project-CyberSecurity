import { Request, Response } from 'express';
import { connect } from '../data/database';
import * as data from '../data/user';


export const newUser = async (req: Request, res: Response) => {
    const { username }= req.body;
    try {
        await data.newUser(username);
        res.status(200).json({message: "New user created"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }}
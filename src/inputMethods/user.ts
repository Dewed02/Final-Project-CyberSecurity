import { Request, Response } from 'express';
import { connect } from '../data/database';
import * as data from '../data';
import * as fs from 'fs';


export const newUser = async (req: Request, res: Response) => {
    const { username }= req.body;
    try {
        await data.newUser(username);
        res.status(200).json({message: "New user created"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }}

export const login = async (req: Request, res: Response)=> {
    const { username } = req.body;
    try {
        await data.login(username);
        res.status(200).json({message: "Login successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const logout = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await data.logout(username);
        res.status(200).json({message: "Logout successful"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const viewPersonalInfo = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const info = await data.viewPersonalInfo(username);
        res.status(200).json(info);
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    const { username, address } = req.body;
    try {
        await data.updateAddress(username, address);
        fs.appendFile('log.txt', 'Address updated by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Address updated"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}

export const changePassword = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await data.changePassword(username);
        fs.appendFile('log.txt', 'Password changed by user ' + username + '\n', (err) => {
            if (err) throw err;
        });
        res.status(200).json({message: "Password changed"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong :("});
    }
}
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
exports.changePassword = exports.updateAddress = exports.viewPersonalInfo = exports.logout = exports.login = exports.newUser = void 0;
const data = __importStar(require("../data"));
const newUser = async (req, res) => {
    const { username } = req.body;
    try {
        await data.newUser(username);
        res.status(200).json({ message: "New user created" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.newUser = newUser;
const login = async (req, res) => {
    const { username } = req.body;
    try {
        await data.login(username);
        res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    const { username } = req.body;
    try {
        await data.logout(username);
        res.status(200).json({ message: "Logout successful" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.logout = logout;
const viewPersonalInfo = async (req, res) => {
    const { username } = req.body;
    try {
        const info = await data.viewPersonalInfo(username);
        res.status(200).json(info);
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.viewPersonalInfo = viewPersonalInfo;
const updateAddress = async (req, res) => {
    const { username, address } = req.body;
    try {
        await data.updateAddress(username, address);
        res.status(200).json({ message: "Address updated" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.updateAddress = updateAddress;
const changePassword = async (req, res) => {
    const { username } = req.body;
    try {
        await data.changePassword(username);
        res.status(200).json({ message: "Password changed" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong :(" });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=user.js.map
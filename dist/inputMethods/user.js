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
exports.newUser = void 0;
const data = __importStar(require("../data/user"));
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
const newUser = async (req, res) => {
    const { username } = req.body;
    try {
        await data.newUser(username);
        res.status(200).send("User created");
    }
    catch (err) { }
};
exports.newUser = newUser;
//# sourceMappingURL=user.js.map
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
exports.withdrawSavings = exports.withdrawChecking = void 0;
const data = __importStar(require("../data"));
const withdrawChecking = async (req, res) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawChecking(amount, username);
        res.status(200).send("Withdrawal successful");
    }
    catch (err) {
        res.status(400).send("Something went wrong :(");
    }
};
exports.withdrawChecking = withdrawChecking;
const withdrawSavings = async (req, res) => {
    const { amount, username } = req.body;
    try {
        await data.withdrawSavings(amount, username);
        res.status(200).send("Withdrawal successful");
    }
    catch (err) {
        res.status(400).send("Something went wrong :(");
    }
};
exports.withdrawSavings = withdrawSavings;
//# sourceMappingURL=withdraw.js.map
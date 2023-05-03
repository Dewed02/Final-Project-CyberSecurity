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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const inputMethods = __importStar(require("./inputMethods"));
const app = (0, express_1.default)();
const port = 8000;
app.use(body_parser_1.default.json());
app.post('/user/new', inputMethods.newUser);
app.put('/user/login', inputMethods.login);
app.put('/user/logout', inputMethods.logout);
app.get('/user/info', inputMethods.viewPersonalInfo);
app.put('/user/address', inputMethods.updateAddress);
app.put('/user/password', inputMethods.changePassword);
app.post('/savings/new', inputMethods.createSavings);
app.post('/savings/withdraw', inputMethods.withdrawSavings);
app.post('/savings/deposit', inputMethods.depositSavings);
app.get('/savings/balance', inputMethods.savingsBalance);
app.post('/checkings/new', inputMethods.createCheckings);
app.post('/checkings/withdraw', inputMethods.withdrawChecking);
app.post('/checkings/deposit', inputMethods.depositChecking);
app.get('/checkings/balance', inputMethods.checkingBalance);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
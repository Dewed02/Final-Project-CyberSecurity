import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as inputMethods from './inputMethods';


const app: Express = express();
const port = 8000;
process.stdin.setMaxListeners(20);

app.use(bodyParser.json());

app.post('/user/new', inputMethods.newUser);
app.put('/user/login', inputMethods.login);
app.put('/user/logout', inputMethods.logout);
app.get('/user/info', inputMethods.viewPersonalInfo);
app.put('/user/address', inputMethods.updateAddress);
app.put('/user/password', inputMethods.changePassword)

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
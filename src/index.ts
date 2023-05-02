import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as inputMethods from './inputMethods';


const app: Express = express();
const port = 8000;

app.use(bodyParser.json());

app.post('/user/new', inputMethods.newUser);
// app.post('/user/login', inputMethods.login);
app.post('/savings/withdraw', inputMethods.withdrawSavings);
app.post('/savings/deposit', inputMethods.depositSavings);
app.get('/savings/balance', inputMethods.savingsBalance);

app.post('/checkings/withdraw', inputMethods.withdrawChecking);
// app.post('/checkings/deposit', inputMethods.depositChecking);



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
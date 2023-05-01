import express, { Express } from 'express';
import bodyParser from 'body-parser';
// import https from 'https';
import * as inputMethods from './inputMethods';

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());

app.post('/user/new', inputMethods.newUser);


// const httpsOptions = { key: fs.readFileSync('path/to/private/key.pem'), cert: fs.readFileSync('path/to/certificate.pem') };
// const server = https.createServer(httpsOptions, app);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
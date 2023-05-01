import readline from 'readline';
import { connect } from './database';

export const userInputString = async (): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question('', (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

export const userInputNumber = async (): Promise<number> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question('', (answer) => {
            resolve(Number(answer));
            rl.close();
        });
    });
}
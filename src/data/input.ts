import readline from 'readline';
import { connect } from './database';

export const userInputString = async (prompt: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

export const userInputNumber = async (prompt: string): Promise<number> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, _) => {
        rl.question(prompt , (answer) => {
            resolve(Number(answer));
            rl.close();
        });
    });
}

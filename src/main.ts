import { benchmarkSortFunctionsWithSteps, saveToCSV } from './benchmark/index.js';
import { exec } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Length of array: ', (arrayLength) => {
    const arrayUpperBound = Number(arrayLength);

    rl.question('Iterations per array per function: ', (iterations) => {
        const iterationsPerArrayPerFunction = Number(iterations);

        const benchmarkResults = benchmarkSortFunctionsWithSteps(arrayUpperBound, iterationsPerArrayPerFunction);
        saveToCSV(benchmarkResults);

        const pythonScriptPath = path.join(__dirname, '../../app/main.py');
        exec(`python3 ${pythonScriptPath}`, (error, stdout, err) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${err}`);
        });

        rl.close();
    });
});

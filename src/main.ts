import { benchmarkSortFunctionsWithSteps, saveToCSV } from './benchmark/index.js';
// import { exec } from 'child_process';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3091;

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/data', (_req, res) => {
    const csvPath = path.join(__dirname, '..', 'data', 'benchmark_results.csv');
    console.log(`Trying to read from: ${csvPath}`);
    const data = fs.readFileSync(csvPath, 'utf-8');
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server started`);
});

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

        open(`localhost:${PORT}/data`)

        // const pythonScriptPath = path.join(__dirname, '../../app/main.py');
        /*exec(`python3 ${pythonScriptPath}`, (error, stdout, err) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${err}`);
        });*/

        rl.close();
    });
});

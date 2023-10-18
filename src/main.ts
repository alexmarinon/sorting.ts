import { benchmarkSortFunctionsWithSteps, saveToCSV } from './benchmark/index.js';
import readline from 'readline';

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

        rl.close();
    });
});
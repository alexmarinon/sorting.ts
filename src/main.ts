import { benchmarkSortFunctionsWithSteps, saveToCSV } from './benchmark/index.js'
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Length of array: ', (answer) => {

    const arrayUpperBound = answer

    rl.question('Iterations per array per function', (answer) => {
        const iterationsPerArrayPerFunction = answer

        console.log('Indexing... \n')

        const benchmarkResults = benchmarkSortFunctionsWithSteps(Number(arrayUpperBound), Number(iterationsPerArrayPerFunction));
    
        for (const result of benchmarkResults) {
            console.log(`${result.name} took ${result.executionTime.toFixed(2)} ms`);
        }
    
        console.log('Saving to CSV... \n')
    
        saveToCSV(benchmarkResults)
    
        rl.close();
    })

});
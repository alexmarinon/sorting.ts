import { performance } from 'perf_hooks';
import { quickSort, bubbleSort, insertionSort, radixSort } from '../sort/index.js'
import fs from 'fs';

type SortFunction = (array: number[]) => number[];

interface BenchmarkResult {
    name: string,
    executionTime: number;
    arraySize: number;
}

function benchmarkSortFunction(sortFunction: SortFunction, array: number[], runs: number): BenchmarkResult {
    console.log(`Benchmarking ${sortFunction.name}`);
    
    let totalTime = 0;

    for (let i = 0; i < runs; i++) {
        console.log(`Run ${i+1} for ${sortFunction.name}`);
        const shallowArray = [...array];
        const start = performance.now();
        sortFunction(shallowArray);
        const end = performance.now();
        totalTime += (end - start);
        console.log(`Finished run ${i+1} for ${sortFunction.name}`);
    }

    console.log(`All runs finished for ${sortFunction.name} \n`);
    
    return {
        name: sortFunction.name,
        executionTime: totalTime / runs,
        arraySize: array.length
    };
}

function benchMarkSortFunctionList(arraySize: number, iterations: number): BenchmarkResult[] {
    const functions: SortFunction[] = [quickSort, bubbleSort, insertionSort, radixSort];
    const array = Array.from({length: arraySize}, () => Math.floor(Math.random() * arraySize));
    return functions.map(func => benchmarkSortFunction(func, array, iterations));
}

function benchmarkSortFunctionsWithSteps(upperLimit: number, iterations: number): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];
    for(let size = 10; size <= upperLimit; size *= 2) {
        console.log(`Benchmarking for array size: ${size}`);
        results.push(...benchMarkSortFunctionList(size, iterations)); // Adjusted to use the variable 'size'
    }
    return results;
}

function getTheoreticalValues(size: number, scaleNLogN: number = 0.00001, scaleNSquared: number = 0.0000001): { nLogN: number, nSquared: number } {
    return {
        nLogN: size * Math.log2(size) * scaleNLogN,
        nSquared: size * size * scaleNSquared
    };
}

function saveToCSV(results: BenchmarkResult[]): void {
    const header = "Array Size,Bubble Sort Average,Insertion Sort Average,Quick Sort Average,Radix Sort Average,Overall Average,Theoretical nLogN,Theoretical nSquared\n";
    let csvContent = header;
    
    const groupedBySize: { [size: number]: BenchmarkResult[] } = {};
    results.forEach(result => {
        if (!groupedBySize[result.arraySize]) {
            groupedBySize[result.arraySize] = [];
        }
        groupedBySize[result.arraySize].push(result);
    });

    for (const size in groupedBySize) {
        const bubbleSortResult = groupedBySize[size].find(res => res.name === 'bubbleSort')?.executionTime || 0;
        const insertionSortResult = groupedBySize[size].find(res => res.name === 'insertionSort')?.executionTime || 0;
        const quickSortResult = groupedBySize[size].find(res => res.name === 'quickSort')?.executionTime || 0;
        const radixSortResult = groupedBySize[size].find(res => res.name === 'radixSort')?.executionTime || 0;

        const overallAverage = (bubbleSortResult + insertionSortResult + quickSortResult + radixSortResult) / 4;
        const { nLogN, nSquared } = getTheoreticalValues(Number(size));

        csvContent += `${size},${bubbleSortResult.toFixed(4)},${insertionSortResult.toFixed(4)},${quickSortResult.toFixed(4)},${radixSortResult.toFixed(4)},${overallAverage.toFixed(4)},${nLogN.toFixed(4)},${nSquared.toFixed(4)}\n`;
    }

    fs.writeFileSync('./data/benchmark_results.csv', csvContent);
}

export { benchMarkSortFunctionList, benchmarkSortFunction, saveToCSV, benchmarkSortFunctionsWithSteps }
import { quickSort } from "./sort/index.js"

function generateRandomArray(length: number): number[] {
    const numberList: number[] = []

    for (let i: number = 0; i < length; i++) {
        numberList[i] = Math.random() * 100
    }

    return numberList
}

const generatedArray = generateRandomArray(10)

console.log(generatedArray)

const sortedArray = quickSort(generatedArray)

console.log(sortedArray)
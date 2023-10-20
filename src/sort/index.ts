function insertionSort(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
        const currentElement = array[i];
        let lastIndex = i - 1;

        while (lastIndex >= 0 && array[lastIndex] > currentElement) {
            array[lastIndex + 1] = array[lastIndex];
            lastIndex--;
        }
        array[lastIndex + 1] = currentElement;
    }

    return array;
}

function bubbleSort(array: number[]): number[] {
    let swapped: boolean;
    for (let i = 0; i < array.length; i++) {
        swapped = false;
        for (let j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // If no swaps occurred in the last pass, the array is sorted
    }

    return array;
}

function quickSort(array: number[]): number[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot: number = array[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
}

function getDigit(num: number, i: number): number {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num): number {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function maxDigits(nums: number[]): number {
    let max = 0;
    for (const num of nums) {
        max = Math.max(max, digitCount(num));
    }
    return max;
}

function radixSort(nums: number[]): number[] {
    const maxDigitCount = maxDigits(nums);
    for (let k = 0; k < maxDigitCount; k++) {
        const digitBuckets = Array.from({length: 10}, () => []);
        for (let i = 0; i < nums.length; i++) {
            const digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

export { radixSort, insertionSort, quickSort, bubbleSort };

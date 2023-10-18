function insertionSort(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
        let currentElement = array[i];
        let lastIndex = i - 1

        while (lastIndex >= 0 && array[lastIndex] > currentElement) {
            array[lastIndex + 1] = array[lastIndex];
            lastIndex--;
        }
        array[lastIndex + 1] = currentElement;
    }

    return array
}

function bubbleSort(array: number[]): number[] {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {

            if (array[j] > array[j + 1]) {
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }

        }
    }

    return array
}

function quickSort(array: number[]): number[] {
    if (array.length <= 1) {
        return array;
    }

    var pivot: number = array[0];

    var left: number[] = []; 
    var right: number[] = [];

    for (var i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }

    return quickSort(left).concat(pivot, quickSort(right));
}

export { quickSort, bubbleSort, insertionSort }
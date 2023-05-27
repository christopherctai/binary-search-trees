const util = require('util')

const Node = (data, left, right) => {
    return {
        data: data, 
        left: left, 
        right: right
    }
} 

const Tree = (array) => { 
    let uniqueSortedArray = mergeSort([...new Set(array)]);  
    return {
        uniqueSortedArray, 
        root: buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1)
    }
}

function buildTree(array, start, end) {
    if (start > end) {
        return null; 
    }
    let mid = Math.floor((start + end) / 2); 
    let arrayLeft = array.slice(0, mid)
    let arrayRight = array.slice(mid + 1, end + 1); 
    return Node(array[mid], buildTree(arrayLeft, 0, arrayLeft.length - 1), buildTree(arrayRight, 0, arrayRight.length - 1));
    
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]; 
let sortedArray = [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345];
console.log(sortedArray.length); 
console.log(util.inspect(buildTree(sortedArray, 0, sortedArray.length - 1), false, null, true)); 


function mergeSort(array) {
    if (array.length < 2) {
        return array; 
    } else {
        let sortedArray = []; 

        // Sort the left side
        let arrayLeft = mergeSort(array.slice(0, Math.floor((array.length)/2)));

        // Sort the right side 
        let arrayRight = mergeSort(array.slice(Math.floor((array.length)/2), array.length));

        let pointerLeft = 0; 
        let pointerRight = 0;


        // merge the two halves
        for (i = 0; i < array.length; i++) {
            if (arrayLeft[pointerLeft] < arrayRight[pointerRight] || arrayRight[pointerRight] === undefined) {
                sortedArray[i] = arrayLeft[pointerLeft];
                pointerLeft++;
            } else {
                sortedArray[i] = arrayRight[pointerRight];
                pointerRight++;
            }
        }
        return sortedArray; 
    }
}


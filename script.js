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
        root: buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1)
    }
}

function buildTree(array, start, end) {
    let mid = Math.floor((start + end) / 2); 
    let arrayLeft = array.slice(0, mid)
    let arrayRight = array.slice(mid, end); 
    
}

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


let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]; 
console.log(buildTree(array)); 
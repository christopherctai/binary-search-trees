const util = require("util");

// Node factory
const Node = (data, left = null, right = null) => {
    return {
        data: data,
        left: left,
        right: right,
    };
};

// Tree factory
const Tree = (array) => {
  let uniqueSortedArray = mergeSort([...new Set(array)]);

  const buildTree = (array, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let arrayLeft = array.slice(0, mid);
    let arrayRight = array.slice(mid + 1, end + 1);
    return Node(
      array[mid],
      buildTree(arrayLeft, 0, arrayLeft.length - 1),
      buildTree(arrayRight, 0, arrayRight.length - 1)
    );
  };

  const insertValue = (value, root) => {
    if (root === null) {
      return Node(value); 
    }  
    if (value === root.data) {
      return root; 
    } else if (value > root.data) {
      root.right = insertValue(value, root.right);
    } else {
      root.left = insertValue(value, root.left); 
    }
    return root; 
  };

  const deleteValue = (value) => {
    console.log("hi");
  };

  return {
    uniqueSortedArray,
    root: buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1), 
    insertValue
  };
};

// Print a nice looking tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Sort an array with merge sort
function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    let sortedArray = [];

    // Sort the left side
    let arrayLeft = mergeSort(array.slice(0, Math.floor(array.length / 2)));

    // Sort the right side
    let arrayRight = mergeSort(
      array.slice(Math.floor(array.length / 2), array.length)
    );

    let pointerLeft = 0;
    let pointerRight = 0;

    // merge the two halves
    for (i = 0; i < array.length; i++) {
      if (
        arrayLeft[pointerLeft] < arrayRight[pointerRight] ||
        arrayRight[pointerRight] === undefined
      ) {
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


// Experimentation
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = Tree(array);

tree.insertValue(70, tree.root); 
//console.log(util.inspect(tree.root, false, null, true));
prettyPrint(tree.root); 
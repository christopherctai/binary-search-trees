const util = require("util");


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

  // build the tree given an array 
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

  // define the tree 
  let root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

  // insert a node into the tree 
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

  // delete a node from the tree 
  // three cases: 1) no children, 2) one child, 3) two children 
  const deleteValue = (value, root) => {
    // base case 
    if (root === null) {
      return root; 
    }

    // recurse down the tree until we get to the node to be deleted 
    if (value > root.data) {
      root.right = deleteValue(value, root.right); 
    } else if (value < root.data) {
      root.left = deleteValue(value, root.left); 
    } else {
      if (root.right === null) {
        return root.left; 
      } else if (root.left === null) {
        return root.right; 
      }
      // if it has two children: 
      // 1) Change the node's value to the minimum value in the right subtree 
      // 2) Proceed to delete the original node with that value. Reduces the problem to an easier case with one or none children 
      root.data = findMinValue(root.right).data; 
      root.right = deleteValue(root.data, root.right);
    }
    return root; 
  };

  // find the minimum value of a node 
  const findMinValue = (root) => {
    if (root.left === null) {
      return root; 
    }
    return findMinValue(root.left); 
  }

  // find a value and return that node 
  const find = (value, root) => {
    if (root === null || root.data === value) {
      return root;
    } 
    if (value > root.data) {
      return find(value, root.right); 
    } else {
      return find(value, root.left); 
    }
  }

  // level order traversal 
  const levelOrder = (root) => {
    let queue = []; 
    let array = [];
    if (root === null) {
      return root;
    }
    queue.push(root); 
    while (queue.length !== 0 && queue[0] !== null) {
      let front = queue[0];
      if (front.left !== null) queue.push(front.left);
      if (front.right !== null) queue.push(front.right); 
      array.push(front.data);
      queue.shift();
    }
    return array; 

  };

  // reconstructing the level order traversal 
  const levelOrderFunction = (functionParameter) => {
    let queue = []; 
    let array = []; 
    if (root === null) {
      return root; 
    }
    queue.push(root); 
    while(queue.length !== 0 && queue[0] !== null) {
      let front = queue[0]; 
      if (front.left !== null) queue.push(front.left); 
      if (front.right !== null) queue.push(front.right); 
      array.push(front.data); 
      functionParameter(front.data); 
      queue.shift(); 
    }
    return array; 
  }


  return {
    uniqueSortedArray,
    insertValue, 
    deleteValue, 
    find, 
    levelOrder, 
    levelOrderFunction
  };
};



// Experimentation
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = Tree(array);

// prettyPrint(tree.root); 
// tree.insertValue(10, tree.root); 
// prettyPrint(tree.root); 
// tree.deleteValue(8, tree.root); 
// prettyPrint(tree.root); 

console.log(tree.levelOrder(tree.root));
tree.levelOrderFunction(console.log()); 
// console.log(util.inspect(tree.root, false, null, true));




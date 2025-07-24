import { Tree } from "./tree.js";

// Console tree visualizer function - Provided by the lesson
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Sample Array
const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

//Random array creation
const randomArray = []
for (let i = 0; i < 20; i++) {
  randomArray.push(Math.floor(Math.random() * 100));
}

// Test tree creation
const myTree = new Tree(randomArray);
prettyPrint(myTree.root);

// Check if tree is balanced
console.log("Is the tree balanced:", myTree.isBalanced());

// Print in level, pre, post, in order
function printInAllOrders() {
  let printArr = [];
  myTree.levelOrderForEach((item) => printArr.push(item.data));
  console.log("Tree in level order:", printArr);

  printArr = [];
  myTree.preOrderForEach((item) => printArr.push(item.data));
  console.log("Tree in preorder:", printArr);

  printArr = [];
  myTree.postOrderForEach((item) => printArr.push(item.data));
  console.log("Tree in postorder:", printArr);

  printArr = [];
  myTree.inOrderForEach((item) => printArr.push(item.data));
  console.log("Tree inorder:", printArr);
}
printInAllOrders();


// Unbalance tree
console.log("Inserting 10 random values between 100 and 2000");
for (let i = 0; i < 10; i++) {
  let value = Math.floor((Math.random() * 1900) + 100);
  myTree.insert(value);
}

prettyPrint(myTree.root);

// Check if tree is balanced
console.log("Is the tree balanced:", myTree.isBalanced());

// Rebalance tree
console.log("Rebalancing tree");
myTree.rebalance();

// Check if tree is balanced
console.log("Is the tree balanced:", myTree.isBalanced());

printInAllOrders();
prettyPrint(myTree.root);

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

// Test tree creation
const test = new Tree(sample);
prettyPrint(test.root);
console.log(test.root);

// Test insert
// test.insert(test.root, 40);
// prettyPrint(test.root);
// test.insert(test.root, 6);
// prettyPrint(test.root);

// Test delete
// test.deleteItem(1);
test.deleteItem(3);
test.deleteItem(5);
test.deleteItem(7);
// test.deleteItem(9);
// test.deleteItem(23);

prettyPrint(test.root);

// Test find
// console.log(test.find(7));

// Test levelOrderForEach
// test.levelOrderForEach((item) => console.log("Levelorder:", item.data));

// test.inOrderForEach((item) => console.log("Inorder:", item.data));
// test.preOrderForEach((item) => console.log("Preorder:", item.data));
// test.postOrderForEach((item) => console.log("Postorder:", item.data));
// console.log(test.height(67));
// console.log(test.depth(6345));

// test.isBalanced();
console.log(test.isBalanced());

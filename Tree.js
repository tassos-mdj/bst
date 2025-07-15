import { Node } from "./Node.js";

export class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

// Intermediate function to provide sorted and unique values array
function buildTree(array) {
    let arr = dupRemove(quickSort(array));
    return bstRecur(arr, 0, arr.length - 1);
}

// Recursive function that actually builds the tree
function bstRecur(array, start, end){
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = bstRecur(array, start, mid -1);
    root.right = bstRecur(array, mid + 1, end);
    return root;
}

// Sorting helper function
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let p = array[0];
    let left = [];
    let right = [];

    for (let i = 1; i < array.length; i++) {
        array[i] < p ? left.push(array[i]) : right.push(array[i]);
    }

    return [...quickSort(left), p, ...quickSort(right)];
}

// Remove duplicates helper function
function dupRemove(array) {
    return [...new Set(array)];
}
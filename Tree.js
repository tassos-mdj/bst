import { Node } from "./node.js";

export class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    // Insert method
    insert(data, root = this.root) {
        if (root === null) {
            return new Node(data);
        }

        if (root.data === data) {
            return root;
        }

        if (data < root.data) {
            root.left = this.insert(root.left, data);
        } else if (data > root.data) {
            root.right = this.insert(root.right, data);
        }

        return root;
    }

    find(data, root = this.root) {
        if (root === null) {
            return root;
        }

        if (root.data === data) {
            return root;
        }

        if (data < root.data) {
            return this.find(data, root.left);
        } else if (root.data < data) {
            return this.find(data, root.right);
        } else {
            console.log("Not found");
        }
    }

}

// Intermediate function to provide sorted and unique values array
function buildTree(array) {
    let arr = dupRemove(quickSort(array));
    return bstRecur(arr, 0, arr.length - 1);
}

// Recursive function that actually builds the tree
function bstRecur(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = bstRecur(array, start, mid - 1);
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



// Delete function
export function deleteItem(root, data) {
    if (root === null) return root;

    if (data < root.data) {
        root.left = deleteItem(root.left, data);
    } else if (root.data < data) {
        root.right = deleteItem(root.right, data);
    } else {
        if (root.left === null) { return root.right; }

        if (root.right === null) { return root.left; }

        let succ = getSuccessor(root);
        root.data = succ.data;
        root.right = deleteItem(root.right, succ.data);
    }
    return root;
}

function getSuccessor(root) {
    root = root.right;
    while (root !== null && root.left !== null) {
        root = root.left
    }
    return root;
}



function levelOrderForEach(callback) {
    let q = [];


}

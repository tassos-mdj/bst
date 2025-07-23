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

    // Delete method
    deleteItem(data, root = this.root) {
        if (root === null) return root;

        if (data < root.data) {
            root.left = this.deleteItem(data, root.left);
        } else if (root.data < data) {
            root.right = this.deleteItem(data, root.right);
        } else {
            if (root.left === null) { return root.right; }

            if (root.right === null) { return root.left; }

            let succ = getSuccessor(root);
            root.data = succ.data;
            root.right = this.deleteItem(succ.data, root.right);
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
        } 
    }

    levelOrderForEach(callback, root = this.root) {
        const q = [root];

        while (q.length > 0) {
            const current = q.shift();
            if (current === null) continue;
            callback(current);
            if (current.left !== null) {
                q.push(current.left);
            }

            if (current.right !== null) {
                q.push(current.right);
            }
        }

        return;
    }

    inOrderForEach(callback, root = this.root) {
        if (root === null) return;

        if (root.left !== null) {
            this.inOrderForEach(callback, root.left);
        }
        callback(root);
        if (root.right !== null) {
            this.inOrderForEach(callback, root.right)
        }
        return;
    }

    preOrderForEach(callback, root = this.root) {
        if (root === null) return;

        callback(root);

        if (root.left !== null) {
            this.preOrderForEach(callback, root.left);
        }

        if (root.right !== null) {
            this.preOrderForEach(callback, root.right)
        }

        return;
    }

    postOrderForEach(callback, root = this.root) {
        if (root === null) return;

        if (root.left !== null) {
            this.postOrderForEach(callback, root.left);
        }

        if (root.right !== null) {
            this.postOrderForEach(callback, root.right)
        }

        callback(root);

        return;
    }

    height(value, root, h = 0) {
        if (!value || value === null || this.find(value) === null) return null;
        if (!root) {root = this.find(value)};

        let h2 = h;

        if (root.left !== null) {
            h += 1;
            h = this.height(value, root.left, h);

        } 
       
        if (root.right !== null) {
                h2 += 1;
                h2 = this.height(value, root.right, h2);

        }
        
        return h > h2 ? h : h2;
    }

    depth(value) {
        if (!value || this.find(value) === null) return null;

        let curr = this.root;
        let d = 0;
        
        while (curr.data !== value) {
            if (value < curr.data) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
            d += 1;
        }

        return d;
    }

    isBalanced(root = this.root) {
    if (root === null) return true;

    const check = (node) => {
        if (node === null) return { balanced: true, height: 0 };

        const left = check(node.left);
        const right = check(node.right);

        const balanced = left.balanced &&
                         right.balanced &&
                         Math.abs(left.height - right.height) < 2;

        return {
            balanced,
            height: 1 + Math.max(left.height, right.height)
        };
    };

    return check(root).balanced;
    }

    rebalance(root = this.root) {
        const newlist = [];
        this.inOrderForEach((item) => newlist.push(item.data))
        this.root = buildTree(newlist);
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

// Find successor helper function for deleteItem
function getSuccessor(root) {
    root = root.right;
    while (root !== null && root.left !== null) {
        root = root.left
    }
    return root;
}

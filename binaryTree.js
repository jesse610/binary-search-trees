class Node {
    constructor(data, left = null, right = null)
    {
        this.data = data
        this.left = left
        this.right= right
    }
}

class Tree {
    constructor(arr)
    {
        this.arr = this.sortAndRemoveDuplicates(arr)
        this.root = this.buildTree(this.arr, 0, this.arr.length - 1)
    }

    sortAndRemoveDuplicates(arr)
    {
        arr = arr.sort((a, b) => a - b)
        arr = new Set(arr)
        arr = [...arr]

        return arr
    }

    buildTree(arr, start, end){

        if (start > end)
        {
            return null
        }

        let mid = Math.floor((start + end) / 2)
        console.log(mid)
        let rootNode = new Node(arr[mid])
        
        rootNode.left = this.buildTree(arr, start, mid - 1)
        rootNode.right = this.buildTree(arr, mid+1, end)

        return rootNode

    }

    insert(data, rootNode = this.root) {
        if (rootNode === null)
        {
            rootNode = new Node(data)
            return rootNode
        }

        if (rootNode.data > data)
        {
            rootNode.left = this.insert(data, rootNode.left)
        }
        else
        {
            rootNode.right = this.insert(data, rootNode.right)
        }

        return rootNode
    } 

    delete(value, rootNode = this.root)
    {
        if (rootNode.left === null && rootNode.right === null && rootNode.data === value)
        {
            rootNode = null
            return rootNode
        }

        if (rootNode.left === null && rootNode.right != null || rootNode.left != null && rootNode.right === null && rootNode.data === value)
        {
            
        }

        if (rootNode.data > value)
        {
            rootNode.left = this.delete(value, rootNode.left)
        }
        else
        {
            rootNode.right = this.delete(value, rootNode.right)
        }

        return rootNode
    }
}

//    insert(2, rootNode (8))
//      => rootNode(8).left = insert(2, rootNode(4))
//          => rootNode(4).left = insert(2, rootNode(1)) 
//              => rootNode(1).right = insert(2, rootNode(3)) 
//                  => rootNode(3).left = insert(2, null)) => {data: 2, left: null, right: null}


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

let t1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(t1.insert(2))
console.log(t1.insert(6))
console.log(t1.insert(36))
t1.delete(36)
console.log(prettyPrint(t1.root))

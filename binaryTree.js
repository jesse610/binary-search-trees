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

    delete(data, root = this.root)
    {
        if (root === null)
        {
            return root
        }

        if (root.data > data)
        {
            root.left = this.delete(data, root.left)
            return root
        }
        else if (root.data < data)
        {
            root.right = this.delete(data, root.right)
            return root
        }

        if (root.left === null)
        {
            let temp = root.right
            root = null
            return temp
        }
        else if (root.right === null)
        {
            let temp = root.left
            root = null
            return temp
        }
        else
        {
            let succesorParent = root

            let successor = root.right
            while(successor.left !== null)
            {
                succesorParent = successor
                successor = successor.left
            }

            if (succesorParent !== root)
            {
                succesorParent.left = successor.right
            }
            else
            {
                succesorParent.right = successor.right
            }

            root.data = successor.data

            successor = null
            return root
        }
    }

    find(value, root = this.root) {
        if (root === null)
        {
            return root
        }

        if (root.data === value)
        {
            return root
        }

        if (root.data > value)
        {
            return this.find(value, root.left)
        }
        else
        {
            return this.find(value, root.right)
        }
    }

    levelOrder(root = this.root, callback = null) {
        if (root === null)
        {
            return root
        }

        let queue = [root]
        let result = []

        while (queue.length > 0)
        {
            let currentNode = queue.shift()
            result.push(currentNode.data)

            if(callback)
            {
                callback(currentNode)
            }

            if (currentNode.left)
            {
            queue.push(currentNode.left)
            }

            if (currentNode.right)
            {
            queue.push(currentNode.right)
            }
        }

        return result
    }

    preOrder(root = this.root, resultArr = [], callback = null) {
        if (root === null)
        {
            return null
        }

        if(callback)
        {
            callback(root)
        }

        resultArr.push(root.data)
        this.preOrder(root.left, resultArr)
        this.preOrder(root.right, resultArr)

        return resultArr
    }
// 
    inOrder(root = this.root, resultArr = [], callback = null) {
        if (root === null)
        {
            return null
        }

        if (callback)
        {
            callback(root)
        }

        this.inOrder(root.left, resultArr)
        resultArr.push(root.data)
        this.inOrder(root.right, resultArr)

        return resultArr
    }

    postOrder(root = this.root, resultArr = [], callback = null) {
        if (root === null)
        {
            return null
        }

        if (callback)
        {
            callback(root)
        }

        this.postOrder(root.left, resultArr)
        this.postOrder(root.right, resultArr)
        resultArr.push(root.data)

        return resultArr
    }

    height(node) {
        if (node === null)
        {
            return -1
        }

        let leftHeight = this.height(node.left)
        let rightHeight = this.height(node.right)

        return Math.max(leftHeight, rightHeight) + 1
    }

    depth(node, root = this.root, depthCount = -1) {

        if (root === null)
        {
            return -1
        }

        depthCount++

        if (root.data === node)
        {
            return depthCount
        }

        if (root.data > node)
        {
            return this.depth(node, root.left, depthCount)
        }
        else if (root.data < node)
        {
            return this.depth(node, root.right, depthCount)
        }
    }

    isbalanced(root = this.root) {
        const heightLeftSubtree = this.height(root.left)
        const heightRightSubtree = this.height(root.right)
        const heightDifference = Math.abs(heightLeftSubtree - heightRightSubtree)

        if (heightDifference > 1)
        {
            return false
        }

        return true
    }

    rebalance() {
        let treeArr = this.inOrder(this.root)
        this.root = this.buildTree(treeArr, 0, treeArr.length - 1)
    }
}



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

export {Tree}

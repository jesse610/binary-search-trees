import { Tree, prettyPrint } from "./binaryTree.js";

const createRandomArrOfNumbers = (arrLength) => {
    let arr = []
    
    for(let i = 0; i < arrLength; i++)
    {
        let num = getRandomNumber(1, 99)
        arr.push(num)
    }
    return arr
}

const getRandomNumber = (min, max) => {
    const randomDecimal = Math.random()

    const randomNumber = Math.floor(randomDecimal * (max - min + 1))
    return randomNumber
}

const numberArr = createRandomArrOfNumbers(20)
const bst = new Tree(numberArr)
console.log(prettyPrint(bst.root))
console.log(bst.isbalanced())
console.log(bst.levelOrder())
console.log(bst.preOrder())
console.log(bst.postOrder())
console.log(bst.inOrder())
bst.insert(110)
bst.insert(200)
bst.insert(142)
bst.insert(432)
console.log(prettyPrint(bst.root))
console.log(bst.isbalanced())
bst.rebalance()
console.log(prettyPrint(bst.root))
console.log(bst.isbalanced())
console.log(bst.levelOrder())
console.log(bst.preOrder())
console.log(bst.postOrder())
console.log(bst.inOrder())

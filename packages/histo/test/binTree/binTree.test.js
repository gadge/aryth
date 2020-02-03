import { deca, decoLog, logger } from 'xbrief'

class BinTree {
  static binarySearch (arr, val) {
    let lo = 0, hi = arr.length - 1
    while (lo <= hi) {
      const mid = parseInt((lo + hi) / 2)
      if (val === arr[mid]) {
        return mid
      } else if (val > arr[mid]) {
        lo = mid + 1
      } else if (val < arr[mid]) {
        hi = mid - 1
      }
    }
    return -1
  }
}

class BinTreeTest {
  static test () {
    // 下面是二叉树的构造函数，
    // 三个参数分别是左树、当前节点和右树
    function Tree (left, label, right) {
      this.left = left
      this.label = label
      this.right = right
    }

    // 下面是中序（inorder）遍历函数。
    // 由于返回的是一个遍历器，所以要用generator函数。
    // 函数体内采用递归算法，所以左树和右树要用yield*遍历
    function * inorder (t) {
      if (t) {
        yield * inorder(t.left)
        yield t.label
        yield * inorder(t.right)
      }
    }

    // 下面生成二叉树
    function make (array) {
      // 判断是否为叶节点
      if (array.length == 1) return new Tree(null, array[0], null)
      return new Tree(make(array[0]), array[1], make(array[2]))
    }

    let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])

// 遍历二叉树
    const result = []
    for (let node of inorder(tree)) {
      result.push(node)
    }
    tree |> deca({ vu: 5 }) |> logger
    result |> decoLog // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  }
}

BinTreeTest.test()

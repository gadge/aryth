import { CO }                                                           from '@spare/enum-chars'
import { isNumeric }                                                    from '@typen/num-strict'
import { last }                                                         from '@vect/vector-index'
import { acquire }                                                      from '@vect/vector-merge'
import { Associativity, Constants, LEFT, Operators, Precedence, RIGHT } from '../resources/constants'
import { expressionToVector }                                           from './expressionToVector'

// Array.prototype.peek = function () { return this[this.length - 1] }

export function infixToPostfix(infix) {
  const
    math = this?.math ?? Math,
    nums = this?.nums ?? Constants,
    stack = [],
    postfix = []
  let a, b
  for (let x of expressionToVector(infix))
    if (isNumeric(x)) { postfix.push(+x) }
    else if (x in nums) { postfix.push(nums[x]) }
    else if (x in math) { stack.push(math[x]) }
    else if (x === CO) { while ((stack |> last) !== '(') postfix.push(stack.pop()) }
    else if (x in Operators) {
      a = x
      b = (stack |> last)
      while ((b in Operators) && (
        (Associativity[a] === LEFT && (Precedence[a] <= Precedence[b])) ||
        (Associativity[a] === RIGHT && (Precedence[a] < Precedence[b]))
      )) {
        postfix.push(b)
        stack.pop()
        b = (stack |> last)
      }
      stack.push(a)
    }
    else if (x === '(') { stack.push(x) }
    else if (x === ')') {
      while ((stack |> last) !== '(') postfix.push(stack.pop())
      stack.pop()
    }
  if (stack.length) acquire(postfix, stack.reverse())
  return postfix
}




import { CO }                                                           from '@spare/enum-chars'
import { isNumeric }                                                    from '@typen/num-strict'
import { acquire }                                                      from '@vect/vector-merge'
import { Associativity, Constants, LEFT, Operators, Precedence, RIGHT } from '../resources/constants'
import { expressionToVector }                                           from './expressionToVector'

Array.prototype.peek = function () { return this[this.length - 1] }

export const infixToPostfix = function (infix) {
  const elements = expressionToVector(infix)
  const
    functions = this?.functions ?? Math,
    constants = this?.constants ?? Constants,
    stack = [],
    postfix = []
  let a, b
  for (let x of elements)
    if (isNumeric(x)) {
      postfix.push(+x)
    } else if (x in constants) {
      postfix.push(constants[x])
    } else if (x in functions) {
      stack.push(functions[x])
    } else if (x === CO) {
      while (stack.peek() !== '(') postfix.push(stack.pop())
    } else if (x in Operators) {
      a = x
      b = stack.peek()
      while ((b in Operators) && (
        (Associativity[a] === LEFT && (Precedence[a] <= Precedence[b])) ||
        (Associativity[a] === RIGHT && (Precedence[a] < Precedence[b]))
      )) {
        postfix.push(b)
        stack.pop()
        b = stack.peek()
      }
      stack.push(a)
    } else if (x === '(') { stack.push(x) } else if (x === ')') {
      while (stack.peek() !== '(') postfix.push(stack.pop())
      stack.pop()
    }
  if (stack.length) acquire(postfix, stack.reverse())
  return postfix
}




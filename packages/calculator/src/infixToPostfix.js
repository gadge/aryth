import { CO }                                                           from '@spare/enum-chars'
import { isNumeric }                                                    from '@typen/num-strict'
import { last }                                                         from '@vect/vector-index'
import { acquire }                                                      from '@vect/vector-merge'
import { Associativity, Constants, LEFT, Operators, Precedence, RIGHT } from '../resources/constants'
import { expressionToVector }                                           from './expressionToVector'

// Array.prototype.peek = function () { return this[this.length - 1] }

export function infixToPostfix(infix) {
  const DICT = this ?? Constants
  const MATH = this?.math ?? Math
  const stack = [], postfix = []
  let a, b
  for (let x of expressionToVector(infix))
    if (isNumeric(x)) { postfix.push(+x) }
    else if (x in DICT) { postfix.push(DICT[x]) }
    else if (x in MATH) { stack.push(MATH[x]) }
    else if (x === CO) { while ((last(stack)) !== '(') postfix.push(stack.pop()) }
    else if (x in Operators) {
      a = x
      b = (last(stack))
      while ((b in Operators) && (
        (Associativity[a] === LEFT && (Precedence[a] <= Precedence[b])) ||
        (Associativity[a] === RIGHT && (Precedence[a] < Precedence[b]))
      )) {
        postfix.push(b)
        stack.pop()
        b = (last(stack))
      }
      stack.push(a)
    }
    else if (x === '(') { stack.push(x) }
    else if (x === ')') {
      while ((last(stack)) !== '(') postfix.push(stack.pop())
      stack.pop()
    }
  if (stack.length) acquire(postfix, stack.reverse())
  return postfix
}




import { last } from '@vect/vector-index'

// Array.prototype.peek = function () { return this[this.length - 1] }

const LEFT = -1, RIGHT = 1

const ops = '-+/*^'
const Precedence = { '^': 4, '*': 3, '/': 3, '+': 2, '-': 2 }
const Operators = Precedence
const Associativity = { '^': RIGHT, '*': LEFT, '/': LEFT, '+': LEFT, '-': LEFT }

export function shuntingYard(infix) {
  infix = infix.replace(/\s+/g, '') // remove spaces, so infix[i]!=" "
  const stack = []
  let token
  let postfix = ''
  let o1, o2
  for (let i = 0; i < infix.length; i++) {
    token = infix[i]
    if (token >= '0' && token <= '9') { // if token is operand (here limited to 0 <= x <= 9)
      postfix += token + ' '
    }
    else if (token in Operators) { // if token is an operator
      o1 = token
      o2 = (stack |> last)
      while (o2 in Operators && ( // while operator token, o2, on top of the stack
        // and o1 is left-associative and its precedence is less than or equal to that of o2
        (Associativity[o1] === LEFT && (Precedence[o1] <= Precedence[o2])) ||
        // the algorithm on wikipedia says: or o1 precedence < o2 precedence, but I think it should be
        // or o1 is right-associative and its precedence is less than that of o2
        (Associativity[o1] === RIGHT && (Precedence[o1] < Precedence[o2]))
      )) {
        postfix += o2 + ' ' // add o2 to output queue
        stack.pop() // pop o2 of the stack
        o2 = (stack |> last) // next round
      }
      stack.push(o1) // push o1 onto the stack
    }
    else if (token === '(') { // if token is left parenthesis
      stack.push(token) // then push it onto the stack
    }
    else if (token === ')') { // if token is right parenthesis
      while ((stack |> last) !== '(') { // until token at top is (
        postfix += stack.pop() + ' '
      }
      stack.pop() // pop (, but not onto the output queue
    }
  }
  return postfix + stack.reverse().join(' ')
}

const test = () => {
  let infix = '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3'
  console.log(infix)
  const postfix = shuntingYard(infix)
  console.log(postfix)
}

test()


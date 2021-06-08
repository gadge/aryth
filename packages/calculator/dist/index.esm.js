import { NUM, FUN } from '@typen/enum-data-types';
import { CO } from '@spare/enum-chars';
import { isNumeric } from '@typen/num-strict';
import { acquire } from '@vect/vector-merge';
import { Ripper } from '@spare/ripper';
import { trim } from '@spare/string';

const calcPostfix = postfix => {
  const stack = [];
  let t;

  for (let x of postfix) {
    if ((t = typeof x) === NUM) {
      stack.push(+x);
    } else if (t === FUN) {
      stack.push(x.apply(null, stack.splice(-x.length)));
    } else {
      const o2 = stack.pop(),
            o1 = stack.pop();

      if (x === '+') {
        stack.push(o1 + o2);
      } else if (x === '-') {
        stack.push(o1 - o2);
      } else if (x === '*') {
        stack.push(o1 * o2);
      } else if (x === '/') {
        stack.push(o1 / o2);
      } else if (x === '^') {
        stack.push(o1 ** o2);
      }
    }
  }

  return stack[0];
};

const LEFT = -1,
      RIGHT = 1;
const Operators = {
  '^': [4, RIGHT],
  '*': [3, LEFT],
  '/': [3, LEFT],
  '%': [3, LEFT],
  '+': [2, LEFT],
  '-': [2, LEFT]
};
const Precedence = {
  '^': 4,
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2
};
const Associativity = {
  '^': RIGHT,
  '*': LEFT,
  '/': LEFT,
  '+': LEFT,
  '-': LEFT
};
const Constants = {
  E: Math.E,
  PI: Math.PI,
  LN10: Math.LN10,
  LN2: Math.LN2,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2
};

const REG = /[+\-*\/^(),]/g;
const ripper = Ripper(REG);
const expressionToVector = expression => ripper(expression).map(trim);

Array.prototype.peek = function () {
  return this[this.length - 1];
};

const infixToPostfix = function (infix) {
  const elements = expressionToVector(infix);
  const functions = (this == null ? void 0 : this.functions) ?? Math,
        constants = (this == null ? void 0 : this.constants) ?? Constants,
        stack = [],
        postfix = [];
  let a, b;

  for (let x of elements) if (isNumeric(x)) {
    postfix.push(+x);
  } else if (x in constants) {
    postfix.push(constants[x]);
  } else if (x in functions) {
    stack.push(functions[x]);
  } else if (x === CO) {
    while (stack.peek() !== '(') postfix.push(stack.pop());
  } else if (x in Operators) {
    a = x;
    b = stack.peek();

    while (b in Operators && (Associativity[a] === LEFT && Precedence[a] <= Precedence[b] || Associativity[a] === RIGHT && Precedence[a] < Precedence[b])) {
      postfix.push(b);
      stack.pop();
      b = stack.peek();
    }

    stack.push(a);
  } else if (x === '(') {
    stack.push(x);
  } else if (x === ')') {
    while (stack.peek() !== '(') postfix.push(stack.pop());

    stack.pop();
  }

  if (stack.length) acquire(postfix, stack.reverse());
  return postfix;
};

/**
 *
 * Supported binary operators:
 * +, -, *, /, %
 * Below situations are not applicable:
 * unary prefix operator, such as negation(-)
 * unary postfix operator, such as factorial(!)
 * functions with rest parameters
 *
 * @param expression
 * @param functions
 * @param constants
 * @return {*}
 */

const calculator = (expression, {
  functions,
  constants
} = {}) => {
  const postfix = infixToPostfix.call({
    functions,
    constants
  }, expression);
  return calcPostfix(postfix);
};
const Calculator = ({
  functions,
  constants
}) => {
  return expression => {
    var _ref, _expression;

    return _ref = (_expression = expression, infixToPostfix.bind({
      functions,
      constants
    })(_expression)), calcPostfix(_ref);
  };
};

export { Calculator, calculator };

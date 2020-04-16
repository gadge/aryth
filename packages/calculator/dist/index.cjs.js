'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumDataTypes = require('@typen/enum-data-types');
var enumChars = require('@spare/enum-chars');
var numStrict = require('@typen/num-strict');
var mergeAcquire = require('@vect/merge-acquire');

const calcPostfix = postfix => {
  const stack = [];
  let t;

  for (let x of postfix) {
    if ((t = typeof x) === enumDataTypes.NUM) {
      stack.push(+x);
    } else if (t === enumDataTypes.FUN) {
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
const fracture = (body, reg) => {
  let ms,
      bl,
      ph,
      pr = 0,
      cu = 0;
  const vec = [];

  while ((ms = reg.exec(body)) && ([ph] = ms)) {
    cu = ms.index;
    bl = body.slice(pr, cu);
    if ((bl = bl.trim()).length) vec.push(bl);
    if ((ph = ph.trim()).length) vec.push(ph);
    pr = reg.lastIndex;
  }

  if ((ph = body.slice(pr).trim()).length) vec.push(ph);
  return vec;
};
const expressionToVector = expression => fracture(expression, REG); // const expression = 'PI + abs(foo + 127)+ max(left, right)'
//
// fracture(expression, REG) |> delogger

Array.prototype.peek = function () {
  return this[this.length - 1];
};

const infixToPostfix = function (infix) {
  var _this$functions, _this$constants;

  infix = expressionToVector(infix);
  const functions = (_this$functions = this === null || this === void 0 ? void 0 : this.functions) !== null && _this$functions !== void 0 ? _this$functions : Math,
        constants = (_this$constants = this === null || this === void 0 ? void 0 : this.constants) !== null && _this$constants !== void 0 ? _this$constants : Constants,
        stack = [],
        postfix = [];
  let a, b;

  for (let x of infix) {
    if (numStrict.isNumeric(x)) {
      postfix.push(+x);
    } else if (x in constants) {
      postfix.push(constants[x]);
    } else if (x in functions) {
      stack.push(functions[x]);
    } else if (x === enumChars.CO) {
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
  }

  if (stack.length) mergeAcquire.acquire(postfix, stack.reverse());
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

exports.Calculator = Calculator;
exports.calculator = calculator;

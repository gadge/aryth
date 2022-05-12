import { calcPostfix }    from './src/calcPostfix'
import { infixToPostfix } from './src/infixToPostfix'


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
 * @return {*}
 */
export function calculator(expression) {
  if (this?.nums) Object.assign(this, this.nums)
  const postfix = infixToPostfix.call(this, expression)
  return calcPostfix(postfix)
}

export function Calculator(cfg = {}) {
  return calculator.bind(cfg)
}

export {
  calcPostfix,
  infixToPostfix,
}


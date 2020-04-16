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
 * @param functions
 * @param constants
 * @return {*}
 */
export const calculator = (expression, { functions, constants } = {}) => {
  const postfix = infixToPostfix.call({ functions, constants }, expression)
  return calcPostfix(postfix)
}

export const Calculator = ({ functions, constants }) => {
  return expression => expression
    |> infixToPostfix.bind({ functions, constants })
    |> calcPostfix
}


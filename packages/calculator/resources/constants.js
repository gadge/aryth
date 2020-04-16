export const LEFT = -1, RIGHT = 1

export const Operators = {
  '^': [4, RIGHT],
  '*': [3, LEFT],
  '/': [3, LEFT],
  '%': [3, LEFT],
  '+': [2, LEFT],
  '-': [2, LEFT]
}
export const Precedence = { '^': 4, '*': 3, '/': 3, '+': 2, '-': 2 }
export const Associativity = { '^': RIGHT, '*': LEFT, '/': LEFT, '+': LEFT, '-': LEFT }

export const Constants = {
  E: Math.E,
  PI: Math.PI,
  LN10: Math.LN10,
  LN2: Math.LN2,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2,
}

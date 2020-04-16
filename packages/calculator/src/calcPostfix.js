import { FUN, NUM } from '@typen/enum-data-types'

export const calcPostfix = (postfix) => {
  const stack = []
  let t
  for (let x of postfix) {
    if ((t = typeof x) === NUM) { stack.push(+x) }
    else if (t === FUN) { stack.push(x.apply(null, stack.splice(-x.length))) }
    else {
      const o2 = stack.pop(), o1 = stack.pop()
      if (x === '+') { stack.push(o1 + o2) }
      else if (x === '-') { stack.push(o1 - o2) }
      else if (x === '*') { stack.push(o1 * o2) }
      else if (x === '/') { stack.push(o1 / o2) }
      else if (x === '^') { stack.push(o1 ** o2) }
    }
  }
  return stack[0]
}

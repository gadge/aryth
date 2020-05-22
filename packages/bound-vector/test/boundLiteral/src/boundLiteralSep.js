import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { bound }       from '../../../src/bound'
import { stringValue } from '../stringValue'

const selfValue = x => x

export const boundLiteralSep = (
  words,
  x = { filter: isNumeric, mapper: selfValue },
  y = { filter: isLiteral, mapper: stringValue }
) => {
  let n, s
  const
    boundX = bound(n = words.map(v => x.filter(v) ? x.mapper(v) : undefined)),
    boundY = bound(s = words.map(v => y.filter(v) ? y.mapper(v) : undefined))
  Object.assign(n, boundX)
  Object.assign(s, boundY)
  return [n, s]
}

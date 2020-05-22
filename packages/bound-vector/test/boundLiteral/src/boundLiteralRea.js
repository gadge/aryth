import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { iterate }     from '@vect/vector-mapper'
import { stringValue } from '../stringValue'

export class BoundFactory {
  static build () { return { max: undefined, min: undefined, list: undefined } }
}

export const boundLiteralRea = (
  words,
  x = { filter: isNumeric },
  y = { filter: isLiteral }
) => {
  const
    n = BoundFactory.build(),
    s = BoundFactory.build()
  const l = words?.length
  iterate(
    words,
    (v, i) => {
      if (x.filter(v)) {
        if (v > (n.max ?? (n.max = n.min = v))) { n.max = v } else if (v < n.min) { n.min = v }
        return (n.list ?? (n.list = Array(l)))[i] = v
      }
      if (y.filter(v) && (v = stringValue(v))) {
        if (v > (s.max ?? (s.max = s.min = v))) { s.max = v } else if (v < s.min) { s.min = v }
        return (s.list ?? (s.list = Array(l)))[i] = v
      }
      return NaN
    },
    l
  )
  return [n, s]
}

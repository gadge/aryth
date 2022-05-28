import { hasLiteral }   from '@typen/literal'
import { isNumeric }    from '@typen/numeral'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from '../../parseNumeric'
import { stringValue }  from '../../stringValue'

export class BoundFactory {
  static build () { return { max: undefined, min: undefined, list: undefined } }
}

export const boundLiteralRea = (
  words,
  x = { by: isNumeric, to: parseNumeric },
  y = { by: hasLiteral, to: stringValue }
) => {
  const
    vecX = BoundFactory.build(),
    vecY = BoundFactory.build()
  const l = words?.length
  iterate(
    words,
    (v, i) => {
      if (x.by(v)) {
        v = x.to(v)
        if (v > (vecX.max ?? (vecX.max = vecX.min = v))) { vecX.max = v } else if (v < vecX.min) { vecX.min = v }
        return (vecX.list ?? (vecX.list = Array(l)))[i] = v
      }
      if (y.by(v)) {
        v = y.to(v)
        if (v > (vecY.max ?? (vecY.max = vecY.min = v))) { vecY.max = v } else if (v < vecY.min) { vecY.min = v }
        return (vecY.list ?? (vecY.list = Array(l)))[i] = v
      }
      return NaN
    },
    l
  )
  return [vecX, vecY]
}

import { hasLiteral }   from '@typen/literal'
import { isNumeric }    from '@typen/numeral'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from '../../parseNumeric'
import { stringValue }  from '../../stringValue'

export const boundLiteralArc = (
  words,
  [x = {}, y = {}] = []
) => {
  const l = words?.length
  let vecX = undefined, vecY = undefined
  const { by: byX = isNumeric, to: toX = parseNumeric } = x
  const { by: byY = hasLiteral, to: toY = stringValue } = y
  iterate(words, (v, i) => {
    if (byX(v) && (vecX ?? (vecX = Array(l)))) {
      v = toX(v)
      if (v > (vecX.max ?? (vecX.max = vecX.min = v))) { vecX.max = v } else if (v < vecX.min) { vecX.min = v }
      return vecX[i] = v
    }
    if (byY(v) && (vecY ?? (vecY = Array(l)))) {
      v = toY(v)
      if (v > (vecY.max ?? (vecY.max = vecY.min = v))) { vecY.max = v } else if (v < vecY.min) { vecY.min = v }
      return vecY[i] = v
    }
    return NaN
  }, l)
  return [vecX, vecY]
}

import { stringValue }  from '@spare/string'
import { isLiteral }    from '@typen/literal'
import { isNumeric }    from '@typen/num-strict'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from '../utils/parseNumeric'

export const duobound = function (
  words,
  [x, y] = []
) {
  const l = words?.length
  let vX = undefined, vY = undefined
  if (!l) return [vX, vY]
  const filterX = x?.filter ?? isNumeric, mapperX = x?.mapper ?? parseNumeric
  const filterY = y?.filter ?? isLiteral, mapperY = y?.mapper ?? stringValue
  iterate(words, (v, i) => {
    if (filterX(v) && (vX ?? (vX = Array(l)))) {
      v = mapperX(v)
      if (v > (vX.max ?? (vX.max = vX.min = v))) { vX.max = v } else if (v < vX.min) { vX.min = v }
      return vX[i] = v
    }
    if (filterY(v) && (vY ?? (vY = Array(l)))) {
      v = mapperY(v)
      if (v > (vY.max ?? (vY.max = vY.min = v))) { vY.max = v } else if (v < vY.min) { vY.min = v }
      return vY[i] = v
    }
    return NaN
  }, l)
  return [vX, vY]
}

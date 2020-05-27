import { oneself }     from '@ject/oneself'
import { stringValue } from '@spare/string'
import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-strict'
import { iso }         from '@vect/matrix-init'
import { iterate }     from '@vect/matrix-mapper'
import { size }        from '@vect/matrix-size'

const parseNumeric = x => +x

export const duobound = (
  wordx,
  x = {},
  y = {}
) => {
  const [h, w] = size(wordx)
  let vecX = undefined, vecY = undefined
  if (!h || !w) return [vecX, vecY]
  const { filter: filterX = isNumeric, mapper: mapperX = parseNumeric } = x
  const { filter: filterY = isLiteral, mapper: mapperY = stringValue } = y
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (vecX ?? (vecX = iso(h, w, undefined)))) {
        v = mapperX(v)
        if (v > (vecX.max ?? (vecX.max = vecX.min = v))) { vecX.max = v } else if (v < vecX.min) { vecX.min = v }
        return vecX[i][j] = v
      }
      if (filterY(v) && (vecY ?? (vecY = iso(h, w, undefined)))) {
        v = mapperY(v)
        if (v > (vecY.max ?? (vecY.max = vecY.min = v))) { vecY.max = v } else if (v < vecY.min) { vecY.min = v }
        return vecY[i][j] = v
      }
      return NaN
    },
    h, w
  )
  return [vecX, vecY]
}

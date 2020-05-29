import { stringValue } from '@spare/string'
import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-strict'
import { iso }         from '@vect/matrix-init'
import { iterate }     from '@vect/matrix-mapper'
import { size }        from '@vect/matrix-size'

const parseNumeric = x => +x

export const duobound = (
  wordx,
  [x, y] = [],
) => {
  const [height, width] = size(wordx)
  let vecX = undefined, vecY = undefined
  if (!height || !width) return [vecX, vecY]
  const filterX = x?.filter ?? isNumeric, mapperX = x?.mapper ?? parseNumeric
  const filterY = y?.filter ?? isLiteral, mapperY = y?.mapper ?? stringValue
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (vecX ?? (vecX = iso(height, width, undefined)))) {
        v = mapperX(v)
        if (v > (vecX.max ?? (vecX.max = vecX.min = v))) { vecX.max = v } else if (v < vecX.min) { vecX.min = v }
        return vecX[i][j] = v
      }
      if (filterY(v) && (vecY ?? (vecY = iso(height, width, undefined)))) {
        v = mapperY(v)
        if (v > (vecY.max ?? (vecY.max = vecY.min = v))) { vecY.max = v } else if (v < vecY.min) { vecY.min = v }
        return vecY[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return [vecX, vecY]
}

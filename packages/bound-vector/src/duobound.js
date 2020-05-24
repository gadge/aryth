import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { iterate }     from '@vect/vector-mapper'
import { stringValue } from '../test/boundLiteral/stringValue'

export const oneself = x => x

export const duobound = (
  words,
  x = {},
  y = {}
) => {
  const l = words?.length
  let vecX = undefined, vecY = undefined
  const { filter: filterX = isNumeric, mapper: mapperX = oneself } = x
  const { filter: filterY = isLiteral, mapper: mapperY = stringValue } = y
  iterate(
    words,
    (v, i) => {
      if (filterX(v) && (vecX ?? (vecX = Array(l)))) {
        v = mapperX(v)
        if (v > (vecX.max ?? (vecX.max = vecX.min = v))) { vecX.max = v } else if (v < vecX.min) { vecX.min = v }
        return vecX[i] = v
      }
      if (filterY(v) && (vecY ?? (vecY = Array(l)))) {
        v = mapperY(v)
        if (v > (vecY.max ?? (vecY.max = vecY.min = v))) { vecY.max = v } else if (v < vecY.min) { vecY.min = v }
        return vecY[i] = v
      }
      return NaN
    },
    l
  )
  return [vecX, vecY]
}

import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { iterate }     from '@vect/vector-mapper'
import { stringValue } from '../stringValue'

export class BoundFactory {
  static build () {
    return { max: undefined, min: undefined, list: undefined }
  }
}

const selfValue = x => x

export const boundLiteralArc = (
  words,
  x = { filter: isNumeric, mapper: selfValue },
  y = { filter: isLiteral, mapper: stringValue }
) => {
  const l = words?.length
  let vecX = undefined, vecY = undefined
  const { filter: filterX, mapper: mapperX } = x
  const { filter: filterY, mapper: mapperY } = y
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

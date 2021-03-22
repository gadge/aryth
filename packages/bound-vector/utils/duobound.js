import { stringValue }   from '@texting/string-value'
import { hasLiteralAny } from '@typen/literal'
import { isNumeric }     from '@typen/numeral'
import { iterate }       from '@vect/vector-mapper'
import { parseNumeric }  from './parseNumeric'

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [configX]
 * @param {Config} [configY]
 * @return {[?BoundedVector, ?BoundedVector]}
 */
export const duobound = function (
  words,
  [configX, configY] = []
) {
  const l = words?.length
  let vecX = undefined, vecY = undefined
  if (!l) return [vecX, vecY]
  const { filter: filterX, mapper: mapperX } = configX, { filter: filterY, mapper: mapperY } = configY
  iterate(words, (v, i) => {
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
    l)
  return [vecX, vecY]
}

import { stringValue }   from '@spare/string-value'
import { hasLiteralAny } from '@typen/literal'
import { isNumeric }     from '@typen/numeral'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from './parseNumeric'

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
 * @param {Config} [optX]
 * @param {Config} [optY]
 * @return {[?BoundedVector, ?BoundedVector]}
 */
export const duobound = function (words, [optX, optY] = []) {
  const l = words?.length
  let veX = undefined, veY = undefined
  if (!l) return [veX, veY]
  const filterX = optX?.filter ?? isNumeric, mapX = optX?.mapper ?? parseNumeric
  const filterY = optY?.filter ?? hasLiteralAny, mapY = optY?.mapper ?? stringValue
  iterate(words, (v, i) => {
      if (filterX(v) && (veX ?? (veX = Array(l)))) {
        v = mapX(v)
        if (v > (veX.max ?? (veX.max = veX.min = v))) { veX.max = v } else if (v < veX.min) { veX.min = v }
        return veX[i] = v
      }
      if (filterY(v) && (veY ?? (veY = Array(l)))) {
        v = mapY(v)
        if (v > (veY.max ?? (veY.max = veY.min = v))) { veY.max = v } else if (v < veY.min) { veY.min = v }
        return veY[i] = v
      }
      return NaN
    },
    l)
  return [veX, veY]
}

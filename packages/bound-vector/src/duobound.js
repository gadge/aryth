import { stringValue }  from '@spare/string'
import { hasLiteral }   from '@typen/literal'
import { isNumeric }    from '@typen/num-strict'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from '../utils/parseNumeric'

/**
 *
 * @typedef {*[]} VectorWithBound
 * @typedef {number} VectorWithBound.max
 * @typedef {number} VectorWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[]} words
 * @param {FilterAndMapper} optX
 * @param {FilterAndMapper} optY
 * @return {[?VectorWithBound, ?VectorWithBound]}
 */
export const duobound = function (words, [optX, optY] = []) {
  const l = words?.length
  /** @type {?VectorWithBound} */ let veX = undefined
  /** @type {?VectorWithBound} */ let veY = undefined
  if (!l) return [veX, veY]
  const filterX = optX?.filter ?? isNumeric, mapX = optX?.mapper ?? parseNumeric
  const filterY = optY?.filter ?? hasLiteral, mapY = optY?.mapper ?? stringValue
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

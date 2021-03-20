import { isNumeric }    from '@typen/numeral'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from './parseNumeric'

/**
 *
 * @typedef {*[]} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [config]
 * @return {?BoundedVector}
 */
export const solebound = function (words, config) {
  const l = words?.length
  let vec = undefined
  if (!l) return vec
  const { filter, mapper } = config
  iterate(words, (v, i) => {
      if (filter(v) && (vec ?? (vec = Array(l)))) {
        v = mapper(v)
        if (v > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v } else if (v < vec.min) { vec.min = v }
        return vec[i] = v
      }
      return NaN
    },
    l)
  return vec
}
import { isNumeric }    from '@typen/numeral'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from './parseNumeric'

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
 * @param {FilterAndMapper} [opt]
 * @return {?VectorWithBound}
 */
export const solebound = function (words, opt) {
  const l = words?.length
  /** @type {?VectorWithBound} */ let vec = undefined
  if (!l) return vec
  const filter = opt?.filter ?? isNumeric, mapper = opt?.mapper ?? parseNumeric
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
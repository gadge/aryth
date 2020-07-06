import { stringValue } from '@spare/string'
import { hasLiteral }  from '@typen/literal'
import { iterate }     from '@vect/vector-mapper'

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
  const filter = opt?.filter ?? hasLiteral, mapper = opt?.mapper ?? stringValue
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
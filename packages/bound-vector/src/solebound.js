import { iterate } from '@vect/vector-mapper'

/**
 *
 * @typedef {*[]} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.by
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
  const { by, to } = config
  if (!by) return vec
  iterate(words, (v, i) => {
      if (by(v) && (vec ?? (vec = Array(l)))) {
        if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v } else if (v < vec.min) { vec.min = v }
        return vec[i] = v
      }
      return NaN
    },
    l)
  return vec
}
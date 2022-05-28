import { iterate } from '@vect/vector-mapper'

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
export const multibound = function (words, configs) {
  const l = words?.length
  const vectors = configs.map(_ => null)
  if (!l) return vectors
  iterate(words,
    (v, i) => configs.some(
      ({by, to}, j) => {
        let vec = vectors[j]
        if (by(v) && (vec ?? (vec = (vectors[j] = Array(l))))) {
          if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v } else if (v < vec.min) { vec.min = v }
          return vec[i] = v, true
        }
      }),
    l)
  return vectors
}

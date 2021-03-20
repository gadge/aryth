import { iterate } from '@vect/vector-mapper'

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
export const multibound = function (words, configs) {
  const l = words?.length
  const vectorCollection = configs.map(x => undefined)
  if (!l) return vectorCollection
  iterate(words,
    (v, i) => configs.some(
      ({ filter, mapper }, j) => {
        let vec = vectorCollection[j]
        if (filter(v) && (vec ?? (vec = (vectorCollection[j] = Array(l))))) {
          v = mapper(v)
          if (v > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v } else if (v < vec.min) { vec.min = v }
          return vec[i] = v, true
        }
      }),
    l)
  return vectorCollection
}

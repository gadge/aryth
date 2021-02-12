import { entriesCounter, objectCounter, objectDistinctor, sortByValues, vectorDistinctor } from '@aryth/util-distinct'
import { iterate }                                                                         from '@vect/matrix-mapper'

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */
export const distinct = function (mx, h, w) {
  let o
  return (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, vectorDistinctor.bind(o), h, w), o)
    : (o = {}, iterate(mx, objectDistinctor.bind(o), h, w), Object.keys(o))
}

/**
 *
 * @param {*[]} mx
 * @param {string|boolean} [sort=false]
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */
export const distinctCount = function (mx,{ sort, h, w}) {
  let o
  const ents = (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, entriesCounter.bind(o), h, w), o)
    : (o = {}, iterate(mx, objectCounter.bind(o), h, w), Object.entries(o))
  if (sort) sortByValues(ents, sort)
  return ents
}

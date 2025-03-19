import { entriesCounter, objectCounter, objectDistinctor, sortByValues, vectorDistinctor } from '@aryth/util-distinct'
import { iterate }                                                                         from '@vect/vector-mapper'

/**
 *
 * @param {*[]} arr
 * @param {number} [l]
 * @returns {[any, any][]|[]|any[]|*}
 */
export const distinct = function (arr, l) {
  let o
  return (l = arr?.length) === (l & 0x7f)
    ? (o = [], iterate(arr, vectorDistinctor.bind(o), l), o)
    : (o = {}, iterate(arr, objectDistinctor.bind(o), l), Object.keys(o))
}

/**
 *
 * @param {*[]} arr
 * @param {string|boolean} [sort=false]
 * @param {number} [l]
 * @returns {[any, any][]|[]|any[]|*}
 */
export const distinctCount = function (arr, { sort, l}) {
  let o
  const ents = (l = arr?.length) === (l & 0x7f)
    ? (o = [], iterate(arr, entriesCounter.bind(o), l), o)
    : (o = {}, iterate(arr, objectCounter.bind(o), l), Object.entries(o))
  if (sort) sortByValues(ents, sort)
  return ents
}

import { iterate } from '@vect/vector-mapper'
import { counterEnt, counterOb, distinctorAr, distinctorOb, sortByValues } from '@aryth/util-distinct'

/**
 *
 * @param {*[]} arr
 * @param {number} [l]
 * @returns {[any, any][]|[]|any[]|*}
 */
export const distinct = function (arr, l) {
  let o
  return (l = arr?.length) === (l & 0x7f)
    ? (o = [], iterate(arr, distinctorAr.bind(o), l), o)
    : (o = {}, iterate(arr, distinctorOb.bind(o), l), Object.keys(o))
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
    ? (o = [], iterate(arr, counterEnt.bind(o), l), o)
    : (o = {}, iterate(arr, counterOb.bind(o), l), Object.entries(o))
  if (sort) sortByValues(ents, sort)
  return ents
}
import { entriesCounter, objectCounter, objectDistinctor, sortByValues, vectorDistinctor } from 'projects/util-distinct'
import { iterate }                                                                         from '@vect/column-mapper'

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @returns {[*,number][]}
 */
export const distinct = function (mx, h) {
  let { y } = this
  let o
  return (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, y, vectorDistinctor.bind(o), h), o)
    : (o = {}, iterate(mx, y, objectDistinctor.bind(o), h), Object.keys(o))
}

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {string|boolean} [sort=false]
 * @returns {[*,number][]}
 */
export const distinctCount = function (mx, { h, sort } = {}) {
  let { y } = this
  let o
  const ents = (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, y, entriesCounter.bind(o), h), o)
    : (o = {}, iterate(mx, y, objectCounter.bind(o), h), Object.entries(o))
  if (sort) sortByValues(ents, sort)
  return ents
}

export const Distinct = y => distinct.bind({ y })
export const DistinctCount = y => distinctCount.bind({ y })



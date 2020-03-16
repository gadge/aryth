import { max } from '@aryth/comparer'
import { rand } from './rand'
import { swap } from '../utils/swap'

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ve
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Array} mutated array
 */
export const shuffle = function (ve, size) {
  let l = ve.length
  const lo = max(0, l - (size ?? l))
  for (--l; l >= lo; l--)
    swap.call(ve, l, rand(l))
  return lo ? (ve.splice(0, lo), ve) : ve
}

/**
 *
 * Object keys can be set via 'this.keys'
 * Default keys are Object.keys(o), the enumerable list of o's keys.
 * @param {Object} o
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Object} new object
 */
export const shuffleObject = function (o, size) {
  const keys = this?.keys || Object.keys(o)
  let l = keys.length, k
  const lo = max(0, l - (size ?? l)), rs = {}
  for (--l; l >= lo; l--)
    rs[k = swap.call(keys, rand(l), l)] = o[k]
  return rs
}





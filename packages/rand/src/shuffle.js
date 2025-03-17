import { max }  from '@aryth/comparer'
import { swap } from '@vect/swap'
import { rand } from '../src/rand.js'

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ve
 * @param {number} [size] - if omitted, size will be keys.length
 * @deprecated shuffle under @aryth/rand will be out-of-maintenance soon, please switch to @vect/vector-select
 * @returns {Array} mutated array
 */
export const shuffle = function (ve, size) {
  let l = ve.length
  const lo = max(0, l - (size ?? l))
  while (--l >= lo)
    swap.call(ve, l, rand(l))
  return lo ? (ve.splice(0, lo), ve) : ve
}

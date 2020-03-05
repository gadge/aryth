import { shuffler } from '../utils/Shuffler'
import { rand } from './rand'
import { swap } from '../utils/swap'

export const shuffle = (ar, size) => shuffler.call({ length: ar.length, size: size || ar.length }, ar)

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ar
 * @param {number} [size]
 */
export const knuthShuffle = function (ar, size) {
  let l = ar.length
  const hi = size > l ? l : size || l, tail = l - hi
  for (--l; l >= tail; l--)
    swap.call(ar, l, rand(l))
  return tail ? (ar.splice(hi, tail), ar) : ar
}





import { rand } from '../../src/rand.js'

/**
 * Reservoir sampling
 * @param {Array} ar
 * @param {number} [size]
 */
export const reservoir = function (ar, size) {
  let l = ar.length, index
  const sz = size > l ? l : size || l, tm = l - sz
  const pool = ar.slice(sz)
  for (--l; l >= tm; l--) {
    index = rand(l)
    if (index < tm) pool[index] = ar[l]
    // swap.call(ar, rand(l), l)
  }
  return ar.splice(sz, tm), ar
}

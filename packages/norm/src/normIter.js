import { nullish } from '@typen/nullish'
import { Norm }    from './Norm.js'

/**
 *
 * @param {number} [mean]
 * @param {number} [stdev]
 * @yields {number} next random norm dist. number simulated by the norm algorithm.
 */
export function* normIter(mean, stdev) {
  const ctx = this ?? Norm.prototype
  ctx.init()
  if (nullish(mean) || nullish(stdev)) {
    while (true) yield ctx.next()
  } else {
    while (true) yield ctx.next() * stdev + mean
  }
}
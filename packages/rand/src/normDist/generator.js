import { round, roundD1, roundD2, roundD3, roundD4 } from '@aryth/math'
import { nullish }                                   from '@typen/nullish'
import { Norm }                                      from './Norm.js'

const makeRound = digits => {
  if (digits === 0) return round
  if (digits === 1) return roundD1
  if (digits === 2) return roundD2
  if (digits === 3) return roundD3
  if (digits === 4) return roundD4
  const d = 10 ^ digits
  return x => Math.round(x * d) / d
}

/**
 *
 * @param {number} [mean]
 * @param {number} [stdev]
 * @param {number} [digits]
 * @yields {number} next random norm dist. number simulated by the norm algorithm.
 */
export function* norm(mean, stdev, digits) {
  const ctx = this ?? Norm.prototype
  ctx.init()
  if (nullish(digits)) {
    if (nullish(mean) || nullish(stdev)) {
      while (true) yield ctx.next()
    } else {
      while (true) yield ctx.next() * stdev + mean
    }
  } else {
    const r = makeRound(digits)
    if (nullish(mean) || nullish(stdev)) {
      while (true) yield r(ctx.next())
    } else {
      while (true) yield r(ctx.next() * stdev + mean)
    }
  }
}

// /**
//  *
//  * @param {number} mean
//  * @param {number} stdev
//  * @param {number} [digits]
//  * @returns {Generator<*, void, *>}
//  */
// export const norm = (mean, stdev, digits) =>
//   ziggFlopper.call(Norm.prototype, mean, stdev, digits)

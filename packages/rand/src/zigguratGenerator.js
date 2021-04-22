import { round, roundD1, roundD2 } from '@aryth/math'
import { nullish }                 from '@typen/nullish'
import { Ziggurat }                from './ziggurat'


/**
 *
 * @param {number} mean
 * @param {number} stdev
 * @param {number} [digits]
 * @yields {number} next random norm dist. number simulated by the ziggurat algorithm.
 */
export function* zigguratGenerator(mean, stdev, digits) {
  this.bootstrap(mean, stdev)
  if (nullish(digits)) {
    while (true) yield this.randSample() * this.stdev + this.mean
  }
  else {
    if (digits > 2) this.D = 10 ^ digits
    const rounder = digits === 0 ? round : digits === 1 ? roundD1 : digits === 2 ? roundD2 : x => Math.round(x * this.D) / this.D
    while (true) yield rounder(this.randSample() * this.stdev + this.mean)
  }
}

/**
 *
 * @param {number} mean
 * @param {number} stdev
 * @param {number} [digits]
 * @returns {Generator<*, void, *>}
 */
export const ziggurat = (mean, stdev, digits) =>
  zigguratGenerator.call(Ziggurat.prototype, mean, stdev, digits)
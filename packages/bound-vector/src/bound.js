import { boundOutput, ToNum } from '@aryth/util-bound'
import { LOOSE }      from '@typen/enum-check-levels'
import { firstEntry } from '../utils/firstEntry'

/**
 *
 * @param {*[]} vec
 */
export function bound(vec) {
  /** @type {{dif: boolean, level: number}} */ const cfg = this ?? {dif: true, level: LOOSE}
  const toOutput = boundOutput.bind(cfg), toNum = ToNum(cfg.level)
  let hi = vec?.length
  if (!hi) return toOutput(NaN, NaN)
  let [ i, x ] = firstEntry(vec, 0, hi, cfg)
  let min, max = min = toNum(x)
  for (++i; i < hi; i++) if ((x = toNum(vec[i])) < min) { min = x } else if (x > max) { max = x }
  return toOutput(max, min)
}

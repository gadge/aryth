import { bound as boundVector } from '@aryth/bound-vector'
import { boundOutput, ToNum }   from '@aryth/util-bound'
import { LOOSE }                from '@typen/enum-check-levels'
import { size }                 from '@vect/matrix-size'
import { iniNumEntry }          from '../utils/iniNumEntry'

/**
 *
 * @param {*[]} mx
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export function bound (mx) {
  /** @type {{dif: boolean, level: number}} */ const config = this || { dif: false, level: LOOSE }
  const embedLevel = { level: config.level }
  const toOutput = boundOutput.bind(config), toNum = ToNum(config.level)
  let [h, w] = size(mx)
  if (!h || !w) return toOutput(NaN, NaN)
  let [i, , el] = iniNumEntry(mx, 0, h, 0, w, config)
  let max, min = max = toNum(el), rowMax, rowMin
  for (--h; h >= i && ({ max: rowMax, min: rowMin } = boundVector.call(embedLevel, mx[h])); h--)
    if (rowMin < min) { min = rowMin }
    else if (rowMax > max) { max = rowMax }
  return toOutput(max, min)
}

export function leap (mx) {
  /** @type {{dif: boolean, level: number}} */ const config = this || { level: LOOSE }
  config.dif = true
  return bound.call(config, mx)
}

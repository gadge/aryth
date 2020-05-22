import { boundOutput, ToNum } from '@aryth/util-bound'
import { LOOSE }              from '@typen/enum-check-levels'
import { iniNumEntry }        from '../utils/iniNumEntry'

/**
 *
 * @param {*[]} vec
 */
export function bound (vec) {
  /** @type {{dif: boolean, level: number}} */ const config = this || { dif: false, level: LOOSE }
  const toOutput = boundOutput.bind(config), toNum = ToNum(config.level)
  let l = vec?.length
  if (!l) return toOutput(NaN, NaN)
  let [i, x] = iniNumEntry(vec, 0, l, config)
  let min, max = min = toNum(x)
  for (++i; i < l; i++)
    if ((x = vec[i] |> toNum) < min) { min = x }
    else if (x > max) { max = x }
  return toOutput(max, min)
  // @returns {{min:number, max:number}|{min:number, dif:number}}
}

export function leap (vec) {
  /** @type {{dif: boolean, level: number}} */ const config = this || { level: LOOSE }
  config.dif = true
  return bound.call(config, vec)
}

import { BoundOutput, ToNum, NUM_LEVEL_NONE } from '@aryth/util-bound'
import { iniNumEntry } from '../utils/iniNumEntry'

/**
 *
 * @param {*[]} arr
 * @param {boolean} [dif=false]
 * @param {number} [level=0] 0:no check, 1:loose, 2:strict
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export function bound (arr, { dif = false, level = NUM_LEVEL_NONE } = {}) {
  const bo = BoundOutput(dif), toNum = ToNum(level)
  let l = arr && arr.length
  if (!l) return bo(NaN, NaN)
  let [i, x] = iniNumEntry(arr, 0, l, { level })
  let min, max = min = toNum(x)
  for (++i; i < l; i++)
    if ((x = arr[i] |> toNum) < min) { min = x } else if (x > max) { max = x }
  return bo(max, min)
}

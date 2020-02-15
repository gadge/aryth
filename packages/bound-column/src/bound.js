import { BoundOutput, ToNum, NUM_LEVEL_NONE } from '@aryth/util-bound'
import { iniNumEntry } from '../utils/iniNumEntry'
import { size } from '@vect/matrix-size'

export function columnBound (mx, { dif = false, level = NUM_LEVEL_NONE } = {}) {
  const { y } = this
  const bo = BoundOutput(dif), toNum = ToNum(level)
  let [h, w] = size(mx)
  if (!h || !w || y >= w) return bo(NaN, NaN)
  let [i, x] = iniNumEntry(mx, 0, h, y, { level }),
    max, min = max = toNum(x)
  for (++i; i < h; i++)
    if ((x = toNum(mx[i][y])) < min) {min = x} else if (x > max) {max = x}
  return bo(max, min)
}

export const ColumnBound = y => columnBound.bind({ y })

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {boolean} [dif=false]
 * @param {number} [level=0] - level: 0, none; 1, loose; 2, strict
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export const bound =
  (mx, y, { dif = false, level = NUM_LEVEL_NONE } = {}) =>
    columnBound.call({ y }, mx, { dif, level })

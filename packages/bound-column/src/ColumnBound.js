import { BoundOutput, NUM_LEVEL_NONE, ToNum } from '@aryth/util-bound'
import { size } from '@vect/matrix-size'
import { iniNumEntry } from '../utils/iniNumEntry'

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

import { boundOutput, ToNum } from '@aryth/util-bound'
import { LOOSE }              from '@typen/enum-check-levels'
import { size }               from '@vect/matrix-size'
import { iniNumEntry }        from '../utils/iniNumEntry'

export function columnBound (mx) {
  /** @type {{dif: boolean, level: number}} */ const config = this || { dif: false, level: LOOSE }
  const { y } = this
  const toOutput = boundOutput.bind(config), toNum = ToNum(config.level)
  let [h, w] = size(mx)
  if (!h || !w || y >= w) return toOutput(NaN, NaN)
  let [i, x] = iniNumEntry(mx, 0, h, y, config),
    max, min = max = toNum(x)
  for (++i; i < h; i++)
    if ((x = toNum(mx[i][y])) < min) {min = x}
    else if (x > max) {max = x}
  return toOutput(max, min)
}

export const ColumnBound = (y, level = LOOSE) => columnBound.bind({ y, level })

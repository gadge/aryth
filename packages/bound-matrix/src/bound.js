import { bound as boundVector } from '@aryth/bound-vector'
import { boundOutput, ToNum }   from '@aryth/util-bound'
import { LOOSE }                from '@typen/enum-check-levels'
import { size }                 from '@vect/matrix-index'
import { firstCoord }           from '../utils/firstCoord'

/**
 *
 * @param {*[]} mx
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export function bound(mx) {
  /** @type {{dif: boolean, level: number}} */ const config = this ?? {dif: true, level: LOOSE}
  const embedLevel = {level: config.level}
  const toOutput = boundOutput.bind(config), toNum = ToNum(config.level)
  let [ h, w ] = size(mx)
  if (!h || !w) return toOutput(NaN, NaN)
  let [ i, , v ] = firstCoord(mx, 0, h, 0, w, config)
  let max, min = max = toNum(v), rowMax, rowMin
  for (--h; h >= i && ({max: rowMax, min: rowMin} = boundVector.call(embedLevel, mx[h])); h--)
    if (rowMin < min) { min = rowMin }
    else if (rowMax > max) { max = rowMax }
  return toOutput(max, min)
}

import { stringValue }         from '@texting/string-value'
import { hasLiteralAny }       from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { iso }                 from '@vect/matrix-init'
import { iterate }             from '@vect/matrix-mapper'
import { size }                from '@vect/matrix-size'

const parseNumeric = x => +x

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config} configX
 * @param {Config} configY
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */
export const duobound = (
  wordx,
  [configX, configY] = []
) => {
  const [h, w] = size(wordx)
  let matX = undefined, matY = undefined
  if (!h || !w) return [matX, matY]
  const { filter: filterX, mapper: mapperX } = configX, { filter: filterY, mapper: mapperY } = configY
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (matX ?? (matX = iso(h, w, undefined)))) {
        v = mapperX(v)
        if (v > (matX.max ?? (matX.max = matX.min = v))) { matX.max = v } else if (v < matX.min) { matX.min = v }
        return matX[i][j] = v
      }
      if (filterY(v) && (matY ?? (matY = iso(h, w, undefined)))) {
        v = mapperY(v)
        if (v > (matY.max ?? (matY.max = matY.min = v))) { matY.max = v } else if (v < matY.min) { matY.min = v }
        return matY[i][j] = v
      }
      return NaN
    },
    h, w
  )
  return [matX, matY]
}

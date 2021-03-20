import { stringValue }         from '@spare/string-value'
import { hasLiteralAny }       from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { iso }                 from '@vect/matrix-init'
import { iterate }             from '@vect/matrix-mapper'
import { size }                from '@vect/matrix-size'

const parseNumeric = x => +x

/**
 *
 * @typedef {*[][]} MatrixWithBound
 * @typedef {number} MatrixWithBound.max
 * @typedef {number} MatrixWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[][]} wordx
 * @param {FilterAndMapper} optX
 * @param {FilterAndMapper} optY
 * @return {[?MatrixWithBound, ?MatrixWithBound]}
 */
export const duobound = (wordx, [optX, optY] = [],) => {
  const [h, w] = size(wordx)
  /** @type {?MatrixWithBound} */ let dtX = undefined
  /** @type {?MatrixWithBound} */ let dtY = undefined
  if (!h || !w) return [dtX, dtY]
  const filterX = optX?.filter ?? isNumeric, mapperX = optX?.mapper ?? parseNum
  const filterY = optY?.filter ?? hasLiteralAny, mapperY = optY?.mapper ?? stringValue
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (dtX ?? (dtX = iso(h, w, undefined)))) {
        v = mapperX(v)
        if (v > (dtX.max ?? (dtX.max = dtX.min = v))) { dtX.max = v } else if (v < dtX.min) { dtX.min = v }
        return dtX[i][j] = v
      }
      if (filterY(v) && (dtY ?? (dtY = iso(h, w, undefined)))) {
        v = mapperY(v)
        if (v > (dtY.max ?? (dtY.max = dtY.min = v))) { dtY.max = v } else if (v < dtY.min) { dtY.min = v }
        return dtY[i][j] = v
      }
      return NaN
    },
    h, w
  )
  return [dtX, dtY]
}

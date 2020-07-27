import { stringValue } from '@spare/string-value'
import { hasLiteral }  from '@typen/literal'
import { isNumeric }   from '@typen/num-strict'
import { iso }         from '@vect/matrix-init'
import { iterate }     from '@vect/matrix-mapper'
import { size }        from '@vect/matrix-size'

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
  const [height, width] = size(wordx)
  /** @type {?MatrixWithBound} */ let maX = undefined
  /** @type {?MatrixWithBound} */ let maY = undefined
  if (!height || !width) return [maX, maY]
  const filterX = optX?.filter ?? isNumeric, mapX = optX?.mapper ?? parseNumeric
  const filterY = optY?.filter ?? hasLiteral, mapY = optY?.mapper ?? stringValue
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (maX ?? (maX = iso(height, width, undefined)))) {
        v = mapX(v)
        if (v > (maX.max ?? (maX.max = maX.min = v))) { maX.max = v } else if (v < maX.min) { maX.min = v }
        return maX[i][j] = v
      }
      if (filterY(v) && (maY ?? (maY = iso(height, width, undefined)))) {
        v = mapY(v)
        if (v > (maY.max ?? (maY.max = maY.min = v))) { maY.max = v } else if (v < maY.min) { maY.min = v }
        return maY[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return [maX, maY]
}

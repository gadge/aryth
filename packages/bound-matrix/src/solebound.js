import { isNumeric } from '@typen/numeral'
import { iso }       from '@vect/matrix-init'
import { iterate }   from '@vect/matrix-mapper'
import { size }      from '@vect/matrix-size'

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
 * @param {FilterAndMapper} [opt]
 * @return {?MatrixWithBound}
 */
export const solebound = (wordx, opt,) => {
  const [height, width] = size(wordx)
  /** @type {?MatrixWithBound} */ let mx = undefined
  if (!height || !width) return mx
  const filterX = opt?.filter ?? isNumeric, mapX = opt?.mapper ?? parseNumeric
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (mx ?? (mx = iso(height, width, undefined)))) {
        v = mapX(v)
        if (v > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v } else if (v < mx.min) { mx.min = v }
        return mx[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return mx
}

import { stringValue } from '@spare/string-value'
import { hasLiteral }  from '@typen/literal'
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
 * @param {FilterAndMapper} [opt]
 * @return {?MatrixWithBound}
 */
export const solebound = (wordx, opt,) => {
  const [height, width] = size(wordx)
  /** @type {?MatrixWithBound} */ let mat = undefined
  if (!height || !width) return mat
  const filterX = opt?.filter ?? hasLiteral, mapX = opt?.mapper ?? stringValue
  iterate(
    wordx,
    (v, i, j) => {
      if (filterX(v) && (mat ?? (mat = iso(height, width, undefined)))) {
        v = mapX(v)
        if (v > (mat.max ?? (mat.max = mat.min = v))) { mat.max = v } else if (v < mat.min) { mat.min = v }
        return mat[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return mat
}

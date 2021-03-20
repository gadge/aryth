import { isNumeric } from '@typen/numeral'
import { iso }       from '@vect/matrix-init'
import { iterate }   from '@vect/matrix-mapper'
import { size }      from '@vect/matrix-size'

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
 * @param {Config} [config]
 * @return {?BoundedMatrix}
 */
export const solebound = (wordx, config) => {
  const [height, width] = size(wordx)
  /** @type {?BoundedMatrix} */ let mx = undefined
  if (!height || !width) return mx
  const { filter, mapper } = config
  iterate(
    wordx,
    (v, i, j) => {
      if (filter(v) && (mx ?? (mx = iso(height, width, undefined)))) {
        v = mapper(v)
        if (v > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v } else if (v < mx.min) { mx.min = v }
        return mx[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return mx
}

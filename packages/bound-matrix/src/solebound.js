import { iso }     from '@vect/matrix-init'
import { iterate } from '@vect/matrix-mapper'
import { size }    from '@vect/matrix-index'

const parseNumeric = x => +x

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.by
 * @typedef {Function} Config.to
 *
 * @param {*[][]} wordx
 * @param {Config} [config]
 * @return {?BoundedMatrix}
 */
export const solebound = (wordx, config) => {
  const [height, width] = size(wordx),{ by, to } = config
  if (!height || !width) return null
  /** @type {?BoundedMatrix} */ let mx = null
  iterate(
    wordx,
    (v, i, j) => {
      if (by(v) && (mx ?? (mx = iso(height, width, null)))) {
        v = to(v)
        if (v > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v } else if (v < mx.min) { mx.min = v }
        return mx[i][j] = v
      }
      return NaN
    },
    height, width
  )
  return mx
}

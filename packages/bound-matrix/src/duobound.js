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
 * @param {Config} x
 * @param {Config} y
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */
export const duobound = (wordx, [ x, y ] = []) => {
  const [ h, w ] = size(wordx)
  let mX = null, mY = null
  if (!h || !w) return [ mX, mY ]
  iterate(
    wordx,
    (v, i, j) => {
      if (x.by(v) && (mX ?? (mX = iso(h, w, null)))) {
        if ((v = x.to(v)) > (mX.max ?? (mX.max = mX.min = v))) { mX.max = v } else if (v < mX.min) { mX.min = v }
        return mX[i][j] = v
      }
      if (y.by(v) && (mY ?? (mY = iso(h, w, null)))) {
        if ((v = y.to(v)) > (mY.max ?? (mY.max = mY.min = v))) { mY.max = v } else if (v < mY.min) { mY.min = v }
        return mY[i][j] = v
      }
      return NaN
    },
    h, w
  )
  return [ mX, mY ]
}

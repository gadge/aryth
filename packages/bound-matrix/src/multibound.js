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
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */
export const multibound = (wordx, configs) => {
  const [ h, w ] = size(wordx)
  const matrices = configs.map(_ => null)
  if (!h || !w) return matrices
  iterate(
    wordx,
    (v, i, j) => {
      configs.some(({by, to}, k) => {
        let mx = matrices[k]
        if (by(v) && (mx ?? (mx = (matrices[k] = iso(h, w, null))))) {
          if ((v = to(v)) > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v } else if (v < mx.min) { mx.min = v }
          mx[i][j] = v
          return true
        }
      })
    },
    h, w
  )
  return matrices
}

import { iso }     from '@vect/matrix-init'
import { iterate } from '@vect/matrix-mapper'
import { size }    from '@vect/matrix-size'

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
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */
export const multibound = (wordx, configs) => {
  const [h, w] = size(wordx)
  const matrixCollection = configs.map(_ => undefined)
  if (!h || !w) return matrixCollection
  iterate(
    wordx,
    (v, i, j) => {
      configs.some(({ filter, mapper }, k) => {
        let mx = matrixCollection[k]
        if (filter(v) && (mx ?? (mx = (matrixCollection[k] = iso(h, w, undefined))))) {
          v = mapper(v)
          if (v > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v } else if (v < mx.min) { mx.min = v }
          mx[i][j] = v
          return true
        }
      })
    },
    h, w
  )
  return matrixCollection
}

// import { isNumeric, parseNum } from '@texting/charset-halfwidth'
// import { stringValue }         from '@texting/string-value'
// import { isLiteral }           from '@typen/literal'
import { iterate } from '@vect/vector-mapper'

// export const NUM_BOUND_CONF_HALF = { by: isNumeric, to: parseNum }
// export const STR_BOUND_CONF_HALF = { by: isLiteral, to: stringValue }
// function wash(configs) {
//   const count = configs.length
//   if (count === 1) {
//     const [ x ] = configs
//     if (x.by) {x}
//   }
//   if (count === 2) {}
//
// }
/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
export const boundaries = function (words, configs) {
  const count = configs.length
  if (count === 0) return []
  if (count === 1) return [ solebound(words, configs[0]) ]
  if (count === 2) return duobound(words, configs)
  return multibound(words, configs)
}

export function solebound(words, config) {
  const size = words?.length
  let vec = undefined
  if (!size) return vec
  const { by, to } = config
  if (!by) return vec
  for (let i = 0, v; i < size; i++) {
    if (by(v = words[i]) && (vec ?? (vec = Array(size)))) {
      if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v }
      else if (v < vec.min) { vec.min = v }
      vec[i] = v
    }
  }
  return vec
}

export function duobound(words, [ x, y ] = []) {
  const hi = words?.length
  let veX = null, veY = null
  if (!hi) return [ veX, veY ]
  iterate(words, (v, i) => {
      if (x.by && x.by(v) && (veX ?? (veX = Array(hi)))) {
        if ((v = x.to(v)) > (veX.max ?? (veX.max = veX.min = v))) { veX.max = v }
        else if (v < veX.min) { veX.min = v }
        return veX[i] = v
      }
      if (y.by && y.by(v) && (veY ?? (veY = Array(hi)))) {
        if ((v = y.to(v)) > (veY.max ?? (veY.max = veY.min = v))) { veY.max = v }
        else if (v < veY.min) { veY.min = v }
        return veY[i] = v
      }
      return NaN
    },
    hi)
  return [ veX, veY ]
}

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
export const multibound = function (words, configs) {
  const l = words?.length
  const vectors = configs.map(_ => null)
  if (!l) return vectors
  iterate(words,
    (v, i) => configs.some(
      ({ by, to }, j) => {
        let vec = vectors[j]
        if (by && by(v) && (vec ?? (vec = (vectors[j] = Array(l))))) {
          if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v }
          else if (v < vec.min) { vec.min = v }
          return vec[i] = v, true
        }
      }),
    l)
  return vectors
}
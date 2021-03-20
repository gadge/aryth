import { duobound }   from '../utils/duobound'
import { multibound } from '../utils/multibound'
import { solebound }  from '../utils/solebound'

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */
export const boundaries = function (wordx, configs) {
  const count = configs.length
  if (count > 2) return multibound(wordx, configs)
  if (count === 2) return duobound(wordx, configs)
  if (count === 1) return [solebound(wordx, configs[0])]
  return []
}
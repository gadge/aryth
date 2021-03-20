import { stringValue }         from '@spare/string-value'
import { hasLiteralAny }       from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { duobound }            from '../utils/duobound'
import { multibound }          from '../utils/multibound'
import { solebound }           from '../utils/solebound'

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
export const boundaries = function (wordx, configs = []) {
  const count = configs.length
  if (count > 2) return multibound(wordx, configs)
  if (count === 2) {
    const [x = {}, y = {}] = configs
    x.filter = x?.filter ?? isNumeric, x.mapper = x?.mapper ?? parseNum
    y.filter = y?.filter ?? hasLiteralAny, y.mapper = y?.mapper ?? stringValue
    return duobound(wordx, [x, y])
  }
  if (count === 1) {
    const [x = {}] = configs
    x.filter = x?.filter ?? isNumeric, x.mapper = x?.mapper ?? parseNum
    return [solebound(wordx, x)]
  }
  return []
}
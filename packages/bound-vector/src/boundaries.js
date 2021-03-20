import { stringValue }         from '@spare/string-value'
import { hasLiteralAny }       from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { duobound }            from '../utils/duobound'
import { multibound }          from '../utils/multibound'
import { solebound }           from '../utils/solebound'

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
export const boundaries = function (words, configs) {
  const count = configs.length
  if (count > 2) return multibound(words, configs)
  if (count === 2) {
    const [x = {}, y = {}] = configs
    x.filter = x?.filter ?? isNumeric, x.mapper = x?.mapper ?? parseNum
    y.filter = y?.filter ?? hasLiteralAny, y.mapper = y?.mapper ?? stringValue
    return duobound(words, configs)
  }
  if (count === 1) {
    const [x = {}] = configs
    x.filter = x?.filter ?? isNumeric, x.mapper = x?.mapper ?? parseNum
    return [solebound(words, configs[0])]
  }
  return []
}
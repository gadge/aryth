import { stringValue }         from '@texting/string-value'
import { hasLiteral }          from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { duobound }            from './duobound'
import { multibound }          from './multibound'
import { solebound }           from './solebound'

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
  if (count === 1) {
    const [x = {}] = configs
    x.by = x?.by ?? isNumeric, x.to = x?.to ?? parseNum
    return [solebound(words, configs[0])]
  }
  if (count === 2) {
    const [x, y] = configs
    const fX = x?.by ?? isNumeric, mX = x?.to ?? parseNum
    const fY = y?.by ?? hasLiteral, mY = y?.to ?? stringValue
    return duobound(words, [{ by: fX, to: mX }, { by: fY, to: mY }])
  }
  if (count >= 3) return multibound(words, configs)
}
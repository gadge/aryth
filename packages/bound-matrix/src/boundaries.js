import { stringValue }         from '@texting/string-value'
import { hasLiteral }          from '@typen/literal'
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
  if (count === 0) return []
  if (count === 1) {
    const [x] = configs
    const filter = x?.filter ?? isNumeric, mapper = x?.mapper ?? parseNum
    return [solebound(wordx, { filter, mapper })]
  }
  if (count === 2) {
    const [x, y] = configs
    const fX = x?.filter ?? isNumeric, mX = x?.mapper ?? parseNum
    const fY = y?.filter ?? hasLiteral, mY = y?.mapper ?? stringValue
    return duobound(wordx, [{ filter: fX, mapper: mX }, { filter: fY, mapper: mY }])
  }
  if (count >= 3) return multibound(wordx, configs)
}
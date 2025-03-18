import { stringValue }         from '@texting/string-value'
import { hasLiteral }          from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { duobound }            from './duobound.js'
import { multibound }          from './multibound.js'
import { solebound }           from './solebound.js'

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
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
    const by = x?.by ?? isNumeric, to = x?.to ?? parseNum
    return [solebound(wordx, { by, to })]
  }
  if (count === 2) {
    const [x, y] = configs
    const fX = x?.by ?? isNumeric, mX = x?.to ?? parseNum
    const fY = y?.by ?? hasLiteral, mY = y?.to ?? stringValue
    return duobound(wordx, [{ by: fX, to: mX }, { by: fY, to: mY }])
  }
  if (count >= 3) return multibound(wordx, configs)
}

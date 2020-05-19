import { LOOSE }       from '@typen/enum-check-levels'
import { columnBound } from './ColumnBound'

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export const bound = function (mx, y) {
  /** @type {{dif: boolean, level: number, y:number}} */ const config = this || { level: LOOSE }
  config.y = y
  return columnBound.call(config, mx)
}

export const leap = function (mx, y) {
  /** @type {{dif: boolean, level: number, y:number}} */ const config = this || { level: LOOSE }
  config.dif = true
  config.y = y
  return columnBound.call(config, mx, y)
}

import { NUM_LEVEL_NONE } from '@aryth/util-bound'
import { columnBound } from './ColumnBound'

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {boolean} [dif=false]
 * @param {number} [level=0] - level: 0, none; 1, loose; 2, strict
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export const bound =
  (mx, y, { dif = false, level = NUM_LEVEL_NONE } = {}) =>
    columnBound.call({ y }, mx, { dif, level })

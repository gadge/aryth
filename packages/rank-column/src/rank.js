import { columnRank, mutateRank } from './ColumnRank'

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [filter]
 * @returns {*[]|*[][]}
 */
export const rank = (mx, y, comparer, filter) =>
  columnRank.call({ y }, mx, comparer, filter)

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [filter]
 * @returns {*[]|*[][]}
 */
export const mutaRank = (mx, y, comparer, filter) =>
  mutateRank.call({ y }, mx, comparer, filter)

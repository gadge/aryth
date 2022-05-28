import { columnRank, mutateRank } from './ColumnRank'

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [by]
 * @returns {*[]|*[][]}
 */
export const rank = (mx, y, comparer, by) =>
  columnRank.call({ y }, mx, comparer, by)

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [by]
 * @returns {*[]|*[][]}
 */
export const mutaRank = (mx, y, comparer, by) =>
  mutateRank.call({ y }, mx, comparer, by)

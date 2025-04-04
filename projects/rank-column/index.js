import { ColumnMapper, ColumnMutate, column } from '@vect/column';

function sort (mx, y, comparer, by) {
  let col = column(mx, y);
  if (by) col = col.filter(by);
  return col.sort(comparer)
}

function columnRank (mx, comparer, by) {
  const { y } = this;
  const sorted = sort(mx, y, comparer, filter);
  return ColumnMapper(y,false)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
}

function mutateRank (mx, comparer, filter) {
  const { y } = this;
  const sorted = sort(mx, y, comparer, filter);
  return ColumnMutate(y)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
}

const ColumnRank = (y) => columnRank.bind({ y });

const MutateRank = (y) => mutateRank.bind({ y });

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [by]
 * @returns {*[]|*[][]}
 */
const rank = (mx, y, comparer, by) =>
  columnRank.call({ y }, mx, comparer, by);

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [by]
 * @returns {*[]|*[][]}
 */
const mutaRank = (mx, y, comparer, by) =>
  mutateRank.call({ y }, mx, comparer, by);

export { ColumnRank, MutateRank, mutaRank, rank };

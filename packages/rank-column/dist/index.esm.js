import { ColumnMapper, ColumnMutate, column } from '@vect/column';

function sort(mx, y, comparer, filter) {
  let col = column(mx, y);
  if (filter) col = col.filter(filter);
  return col.sort(comparer);
}
function columnRank(mx, comparer, filter) {
  const {
    y
  } = this;
  const sorted = sort(mx, y, comparer, filter);
  return ColumnMapper(y, false)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
}
function mutateRank(mx, comparer, filter) {
  const {
    y
  } = this;
  const sorted = sort(mx, y, comparer, filter);
  return ColumnMutate(y)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
}
const ColumnRank = y => columnRank.bind({
  y
});
const MutateRank = y => mutateRank.bind({
  y
});

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [filter]
 * @returns {*[]|*[][]}
 */

const rank = (mx, y, comparer, filter) => columnRank.call({
  y
}, mx, comparer, filter);
/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {function(*,*):number} comparer
 * @param {function(*):*} [filter]
 * @returns {*[]|*[][]}
 */

const mutaRank = (mx, y, comparer, filter) => mutateRank.call({
  y
}, mx, comparer, filter);

export { ColumnRank, MutateRank, mutaRank, rank };

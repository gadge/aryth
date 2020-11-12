'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var column = require('@vect/column');

function sort(mx, y, comparer, filter) {
  let col = column.column(mx, y);
  if (filter) col = col.filter(filter);
  return col.sort(comparer);
}
function columnRank(mx, comparer, filter) {
  const {
    y
  } = this;
  const sorted = sort(mx, y, comparer, filter);
  return column.ColumnMapper(y, false)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
}
function mutateRank(mx, comparer, filter) {
  const {
    y
  } = this;
  const sorted = sort(mx, y, comparer, filter);
  return column.ColumnMutate(y)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
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

exports.ColumnRank = ColumnRank;
exports.MutateRank = MutateRank;
exports.mutaRank = mutaRank;
exports.rank = rank;

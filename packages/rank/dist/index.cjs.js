'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 *
 * @param {*[]} ar
 * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [filter]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
const rank = (ar, comparer, filter) => {
  const sorted = (!filter ? ar.slice() : ar.filter(filter)).sort(comparer);
  return ar.map(x => sorted.indexOf(x));
};
/**
 *
 * @param {*[]} ar
 * @param {number[]} ranks array of the same length as 'arr', containing rank order of 'arr', 0 comes first.
 * @return {*[]}
 */

const reorderBy = (ar, ranks) => {
  const ve = Array(ar.length);

  for (let [i, ord] of ranks.entries()) ve[ord] = ar[i];

  return ve;
};

const STR_ASC = (a, b) => a.localeCompare(b);
const STR_DESC = (a, b) => b.localeCompare(a);
const NUM_ASC = (a, b) => a - b;
const NUM_DESC = (a, b) => b - a;

exports.NUM_ASC = NUM_ASC;
exports.NUM_DESC = NUM_DESC;
exports.STR_ASC = STR_ASC;
exports.STR_DESC = STR_DESC;
exports.rank = rank;
exports.reorderBy = reorderBy;

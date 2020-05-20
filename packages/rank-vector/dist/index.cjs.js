'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');
var literal = require('@typen/literal');
var numLoose = require('@typen/num-loose');
var vectorMapper = require('@vect/vector-mapper');

/**
 *
 * @param {*[]} ar
 * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [filter]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
const rank = (ar, comparer, filter) => {
  const sorted = (!filter ? ar.slice() : ar.filter(filter)).sort(comparer); // return ar.map(x => (x=sorted.indexOf(x)>=0)?x:NaN)

  return ar.map(x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
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

/**
 *
 * @param words
 * @param {Object|Function} x
 * @param {Object|Function} y
 * @return {number[]}
 */

const duorank = (words, x = {
  filter: numLoose.isNumeric,
  comparer: comparer.NUM_ASC
}, y = {
  filter: literal.isLiteral,
  comparer: comparer.STR_ASC
}) => {
  const primVec = [],
        restVec = [];
  vectorMapper.iterate(words, v => {
    if (x.filter(v)) return void primVec.push(v);
    if (y.filter(v)) return void restVec.push(v);
  });
  const primSorted = primVec.sort(x.comparer),
        restSorted = restVec.sort(y.comparer);
  return vectorMapper.mapper(words, x => {
    let i;

    if ((i = primSorted.indexOf(x)) >= 0) {
      return i + 1;
    }

    if ((i = restSorted.indexOf(x)) >= 0) {
      return -(i + 1);
    }

    return NaN;
  });
};

exports.duoRank = duorank;
exports.duorank = duorank;
exports.rank = rank;
exports.reorderBy = reorderBy;

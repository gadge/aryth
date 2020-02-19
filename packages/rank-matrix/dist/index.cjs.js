'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var matrixMapper = require('@vect/matrix-mapper');

/**
 *
 * @param {*[]} mx
 * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [filter]
 * @return {number[]} Rank order array, where 0 denote the first.
 */

const rank = (mx, comparer, filter) => {
  let flat = mx.flat(1);
  if (filter) flat = flat.filter(filter);
  flat = flat.sort(comparer);
  return matrixMapper.mapper(mx, x => flat.indexOf(x));
};

exports.rank = rank;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vectorInit = require('@vect/vector-init');
var vectorSelect = require('@vect/vector-select');
var swap = require('@vect/swap');

function* combinator(vec, count = vec.length) {
  var _vec;

  if (!((_vec = vec) !== null && _vec !== void 0 && _vec.length)) vec = [];
  if (!count) count = vec.length;
  const indexes = vectorInit.iso(count, -1),
        hi = vec.length;
  let lo = 0;

  while (lo >= 0) {
    if (indexes[lo] + count < lo + hi) {
      for (let k = indexes[lo] - lo + 1; lo < count; lo++) indexes[lo] = k + lo;

      yield vectorSelect.select(vec, indexes, count);
    } else {
      lo--;
    }
  }
}

function* permutator(vec) {
  let hi = vec.length,
      c = vectorInit.iso(hi, 0),
      lo = 1;
  yield vec.slice();

  while (lo < hi) {
    if (c[lo] < lo) {
      swap.swap.call(vec, lo, lo % 2 && c[lo]);
      ++c[lo];
      lo = 1;
      yield vec.slice();
    } else {
      c[lo] = 0;
      ++lo;
    }
  }
}

exports.combinator = combinator;
exports.permutator = permutator;

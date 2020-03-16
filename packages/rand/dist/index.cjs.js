'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');

const {
  random
} = Math;
const rand = l => ~~(random() * l);
/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(exclusive) - int
 * @returns {number} int
 */

const randInt = (lo, hi) => rand(hi - lo) + lo;
/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @returns {number} int
 */

const randIntBetw = (lo, hi) => rand(++hi - lo) + lo;
const randLongStr = digit => {
  let t = '';

  while (digit > 20) digit -= 20, t += random().toFixed(20).substring(2);

  return t + random().toFixed(digit).substring(2);
};

const flopIndex = ar => rand(ar.length);
const flop = ar => ar[flopIndex(ar)];
const flopKey = ob => {
  var _Object$keys;

  return _Object$keys = Object.keys(ob), flop(_Object$keys);
};
const flopValue = ob => {
  var _Object$values;

  return _Object$values = Object.values(ob), flop(_Object$values);
};
const flopEntry = ob => {
  var _Object$entries;

  return _Object$entries = Object.entries(ob), flop(_Object$entries);
};

function indexShuffler(ar) {
  let length = this.length || ar.length;
  let size = comparer.min(length, this.size);
  const vec = Array(size);

  for (let i = 0, set = new Set(), rn; i < size; i++) {
    do {
      var _length;

      rn = (_length = length, rand(_length));
    } while (set.has(rn));

    set.add(rn);
    vec[i] = rn;
  }

  return vec;
}
const shuffler = function (ar) {
  return indexShuffler.call(this, ar).map(i => ar[i]);
};
const Shuffler = size => shuffler.bind({
  size
});

const swap = function (i, j) {
  const temp = this[i];
  this[i] = this[j];
  return this[j] = temp;
};

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ar
 * @param {number} [size]
 */

const knuthShuffle = function (ar, size) {
  let l = ar.length;
  const hi = size > l ? l : size || l,
        tail = l - hi;

  for (--l; l >= tail; l--) swap.call(ar, l, rand(l));

  return tail ? (ar.splice(hi, tail), ar) : ar;
};

exports.Shuffler = Shuffler;
exports.flop = flop;
exports.flopEntry = flopEntry;
exports.flopIndex = flopIndex;
exports.flopKey = flopKey;
exports.flopValue = flopValue;
exports.rand = rand;
exports.randInt = randInt;
exports.randIntBetw = randIntBetw;
exports.randLongStr = randLongStr;
exports.shuffle = knuthShuffle;

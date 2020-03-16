import { max, min } from '@aryth/comparer';

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

const swap = function (i, j) {
  const temp = this[i];
  this[i] = this[j];
  return this[j] = temp;
};

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ve
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Array} mutated array
 */

const shuffle = function (ve, size) {
  let l = ve.length;
  const lo = max(0, l - (size !== null && size !== void 0 ? size : l));

  for (--l; l >= lo; l--) swap.call(ve, l, rand(l));

  return lo ? (ve.splice(0, lo), ve) : ve;
};
/**
 *
 * Object keys can be set via 'this.keys'
 * Default keys are Object.keys(o), the enumerable list of o's keys.
 * @param {Object} o
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Object} new object
 */

const shuffleObject = function (o, size) {
  const keys = (this === null || this === void 0 ? void 0 : this.keys) || Object.keys(o);
  let l = keys.length,
      k;
  const lo = max(0, l - (size !== null && size !== void 0 ? size : l)),
        rs = {};

  for (--l; l >= lo; l--) rs[k = swap.call(keys, rand(l), l)] = o[k];

  return rs;
};

function indexShuffler(ar) {
  let length = this.length || ar.length;
  let size = min(length, this.size);
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

export { Shuffler, flop, flopEntry, flopIndex, flopKey, flopValue, rand, randInt, randIntBetw, randLongStr, shuffle, shuffleObject };

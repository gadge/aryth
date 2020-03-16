import { swap } from '@vect/swap';
import { max } from '@aryth/comparer';

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

const flopGenerator = function* (ar, df) {
  var _df, _ar;

  let l = ar.length;

  while (--l >= 0) yield swap.call(ar, rand(l), l);

  df = (_df = df) !== null && _df !== void 0 ? _df : (_ar = ar, flop(_ar));

  while (true) yield df;
};

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ve
 * @param {number} [size] - if omitted, size will be keys.length
 * @deprecated shuffle under @aryth/rand will be out-of-maintenance soon, please switch to @aryth/shuffle
 * @returns {Array} mutated array
 */

const shuffle = function (ve, size) {
  let l = ve.length;
  const lo = max(0, l - (size !== null && size !== void 0 ? size : l));

  while (--l >= lo) swap.call(ve, l, rand(l));

  return lo ? (ve.splice(0, lo), ve) : ve;
};

export { flop, flopEntry, flopGenerator, flopIndex, flopKey, flopValue, rand, randInt, randIntBetw, randLongStr, shuffle };

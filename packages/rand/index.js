import { swap } from '@vect/swap';
export { Norm, n, normIter } from '@aryth/norm';

const { random } = Math;

const rand = l => ~~(random() * l);

/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo (inclusive) - int
 * @param {number} hi (exclusive) - int
 * @returns {number} int
 */
const randIn = (lo, hi) => rand(hi - lo) + lo;

/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo (inclusive) - int
 * @param {number} hi (inclusive) - int
 * @returns {number} int
 */
const betw = (lo, hi) => rand(++hi - lo) + lo;

const randLong = (digit) => {
  let t = '';
  while (digit > 20) digit -= 20, t += random().toFixed(20).substring(2);
  return t + random().toFixed(digit).substring(2)
};

const flopIndex = ar => rand(ar.length);

const flop = ar => ar[flopIndex(ar)];

const flopKey = ob => flop(Object.keys(ob));

const flopValue = ob => flop(Object.values(ob));

const flopEntry = ob => flop(Object.entries(ob));

function* flopper(vec, exhaust = true) {
  let l = vec.length;
  while (--l >= 0) yield swap.call(vec, rand(l), l);
  if (exhaust) return
  yield* flopper(vec, exhaust);
}

export { betw, betw as bw, flop, flopEntry, flopIndex, flopKey, flopValue, flopper, rand, betw as randBetw, randIn, randLong };

import { swap } from '@vect/swap';
import { max } from '@aryth/comparer';
import { nullish } from '@typen/nullish';

const {
  random: random$1
} = Math;
const rand = l => ~~(random$1() * l);
/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(exclusive) - int
 * @returns {number} int
 */

const randIn = (lo, hi) => rand(hi - lo) + lo;
/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @returns {number} int
 */

const randBetw = (lo, hi) => rand(++hi - lo) + lo;
const randLong = digit => {
  let t = '';

  while (digit > 20) digit -= 20, t += random$1().toFixed(20).substring(2);

  return t + random$1().toFixed(digit).substring(2);
};
/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(exclusive) - int
 * @deprecated use randIn instead
 * @returns {number} int
 */

const randInt = (lo, hi) => rand(hi - lo) + lo;
/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @deprecated use randBetw instead
 * @returns {number} int
 */

const randIntBetw = (lo, hi) => rand(++hi - lo) + lo;
/**
 * @deprecated use randLong instead
 * @return {string}
 */

const randLongStr = digit => {
  let t = '';

  while (digit > 20) digit -= 20, t += random$1().toFixed(20).substring(2);

  return t + random$1().toFixed(digit).substring(2);
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
 * @deprecated shuffle under @aryth/rand will be out-of-maintenance soon, please switch to @vect/vector-select
 * @returns {Array} mutated array
 */

const shuffle = function (ve, size) {
  let l = ve.length;
  const lo = max(0, l - (size !== null && size !== void 0 ? size : l));

  while (--l >= lo) swap.call(ve, l, rand(l));

  return lo ? (ve.splice(0, lo), ve) : ve;
};

const {
  random,
  abs,
  exp,
  log,
  sqrt,
  pow,
  cos,
  sin,
  PI
} = Math;

const R0 = 3.442619855899;
const R1 = 1.0 / R0;
const R0S = exp(-0.5 * R0 * R0);
const N2P32 = -pow(2, 32);
const M1 = 2147483648.0;
const VN = 9.91256303526217e-3;
class Ziggurat {
  constructor(mean = 0, stdev = 1) {
    this.bootstrap(mean, stdev);
  }

  static build(mean, stdev) {
    return new Ziggurat(mean, stdev);
  }

  bootstrap(mean, stdev) {
    this.mean = mean;
    this.stdev = stdev;
    this.jsr = 123456789;
    this.wn = Array(128);
    this.fn = Array(128);
    this.kn = Array(128);
    this.jsr ^= new Date().getTime(); // seed generator based on current time

    let m1 = M1,
        dn = R0,
        tn = R0,
        vn = VN,
        q = vn / R0S;
    this.kn[0] = ~~(dn / q * m1);
    this.kn[1] = 0;
    this.wn[0] = q / m1;
    this.wn[127] = dn / m1;
    this.fn[0] = 1.0;
    this.fn[127] = R0S;

    for (let i = 126; i >= 1; i--) {
      dn = sqrt(-2.0 * log(vn / dn + exp(-0.5 * dn * dn)));
      this.kn[i + 1] = ~~(dn / tn * m1);
      tn = dn;
      this.fn[i] = exp(-0.5 * dn * dn);
      this.wn[i] = dn / m1;
    }
  }

  next() {
    return this.randSample() * this.stdev + this.mean;
  }

  nextInt() {
    return Math.round(this.next());
  } // * generator() { while (true) yield this.next() }


  randSample() {
    let hz = this.xorshift(),
        iz = hz & 127;
    return abs(hz) < this.kn[iz] ? hz * this.wn[iz] : this.nfix(hz, iz);
  }

  nfix(hz, iz) {
    let r = R0,
        x,
        y;

    while (true) {
      x = hz * this.wn[iz];

      if (iz === 0) {
        do {
          x = -log(this.uni()) * R1;
          y = -log(this.uni());
        } while (y + y < x * x); // {
        //   x = -log(this.uni()) * r1
        //   y = -log(this.uni())
        // }


        return hz > 0 ? r + x : -r - x;
      }

      if (this.fn[iz] + this.uni() * (this.fn[iz - 1] - this.fn[iz]) < exp(-0.5 * x * x)) return x;
      hz = this.xorshift();
      iz = hz & 127;
      if (abs(hz) < this.kn[iz]) return hz * this.wn[iz];
    }
  }

  xorshift() {
    let m = this.jsr,
        n = m;
    n ^= n << 13;
    n ^= n >>> 17;
    n ^= n << 5;
    this.jsr = n;
    return m + n | 0;
  }

  uni() {
    return 0.5 + this.xorshift() / N2P32;
  }

}

/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */


const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;

const E2 = 1E+2;

const roundD1 = x => Math.round(x * 10) / 10;

const roundD2 = x => Math.round(x * E2) / E2;

/**
 *
 * @param {number} mean
 * @param {number} stdev
 * @param {number} [digits]
 * @yields {number} next random norm dist. number simulated by the ziggurat algorithm.
 */

function* zigguratGenerator(mean, stdev, digits) {
  this.bootstrap(mean, stdev);

  if (nullish(digits)) {
    while (true) yield this.randSample() * this.stdev + this.mean;
  } else {
    if (digits > 2) this.D = 10 ^ digits;
    const rounder = digits === 0 ? round : digits === 1 ? roundD1 : digits === 2 ? roundD2 : x => Math.round(x * this.D) / this.D;

    while (true) yield rounder(this.randSample() * this.stdev + this.mean);
  }
}
/**
 *
 * @param {number} mean
 * @param {number} stdev
 * @param {number} [digits]
 * @returns {Generator<*, void, *>}
 */

const ziggurat = (mean, stdev, digits) => zigguratGenerator.call(Ziggurat.prototype, mean, stdev, digits);

export { Ziggurat, flop, flopEntry, flopGenerator, flopIndex, flopKey, flopValue, rand, randBetw, randIn, randInt, randIntBetw, randLong, randLongStr, shuffle, ziggurat };

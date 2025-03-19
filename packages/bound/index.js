export { bound as boundVector } from '@aryth/bound-vector';
export { bound as boundMatrix } from '@aryth/bound-matrix';
import { intExpon } from '@aryth/math';

function roundBound({ min, max }, extend = 1) {
  const minMag = ( 10 ** extend ) ** ( intExpon(min) - extend );
  const maxMag = ( 10 ** extend ) ** ( intExpon(max) - extend );
  return {
    min: Math.floor(min / minMag) * minMag,
    max: Math.ceil(max / maxMag) * maxMag,
  }
}

const MIN = Number.NEGATIVE_INFINITY;
const MAX = Number.POSITIVE_INFINITY;

class Bound {
  lo
  hi
  constructor(lo = MAX, hi = MIN) {
    this.lo = lo;
    this.hi = hi;
  }
  static build(lo, hi) { return new Bound(lo, hi) }
  get dif() { return this.hi - this.lo }
  get max() { return this.hi }
  get min() { return this.lo }

  collect(iter) {
    for (let v of iter) this.note(v);
    return this
  }

  has(num) { return this.lo <= num && num <= this.hi }
  hasOC(num) { return this.lo < num && num <= this.hi }
  hasCO(num) { return this.lo <= num && num < this.hi }
  within(num) { return this.lo < num && num < this.hi }

  note(val) {
    if (val < this.lo) this.lo = val;
    if (val > this.hi) this.hi = val;
    return val
  }

  lim(val) {
    if (val < this.lo) return this.lo
    if (val > this.hi) return this.hi
    return val
  }

  res(val) {
    const dif = this.hi - this.lo;
    while (val < this.lo) val += dif;
    while (val > this.hi) val -= dif;
    return val
  }
}

class SignedBound {
  pos
  neg
  constructor(posLo = MAX, posHi = 0, negLo = 0, negHi = MIN) {
    this.pos = new Bound(posLo, posHi);
    this.neg = new Bound(negLo, negHi);
  }
  static build(posLo, posHi, negLo, negHi) { return new SignedBound(posLo, posHi, negLo, negHi) }
  get max() { return this.pos.hi }
  get min() { return this.neg.lo }
  get dif() { return this.pos.hi - this.neg.lo }

  note(v) {
    if (v > 0) return this.pos.note(v)
    if (v < 0) return this.neg.note(v)
    return v
  }
}

export { Bound, SignedBound, roundBound };

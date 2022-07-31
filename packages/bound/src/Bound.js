import { MAX, MIN } from './constants.js'

export class Bound {
  lo
  hi
  constructor(lo = MAX, hi = MIN) {
    this.lo = lo
    this.hi = hi
  }
  static build(lo, hi) { return new Bound(lo, hi) }
  get dif() { return this.hi - this.lo }
  get max() { return this.hi }
  get min() { return this.lo }

  collect(iter) {
    for (let v of iter) this.note(v)
    return this
  }

  has(num) { return this.lo <= num && num <= this.hi }
  hasOC(num) { return this.lo < num && num <= this.hi }
  hasCO(num) { return this.lo <= num && num < this.hi }
  within(num) { return this.lo < num && num < this.hi }

  note(val) {
    if (val < this.lo) this.lo = val
    if (val > this.hi) this.hi = val
    return val
  }

  lim(val) {
    if (val < this.lo) return this.lo
    if (val > this.hi) return this.hi
    return val
  }

  res(val) {
    const dif = this.hi - this.lo
    while (val < this.lo) val += dif
    while (val > this.hi) val -= dif
    return val
  }
}
export class Bound {
  lo
  hi
  constructor(lo, hi) {
    this.lo = lo
    this.hi = hi
  }
  static build(lo, hi) { return new Bound(lo, hi) }
  get dif() { return this.hi - this.lo }

  collect(iter) {
    for (let v of iter) { if (v > this.hi) { this.hi = v } else if (v < this.lo) { this.lo = v } }
    return this
  }

  has(num) { return this.lo <= num && num <= this.hi }
  hasLORC(num) { return this.lo < num && num <= this.hi }
  hasLCRO(num) { return this.lo <= num && num < this.hi }
  hasOpen(num) { return this.lo < num && num < this.hi }

  update(val) {
    if (val < this.lo) return this.lo = val
    if (val > this.hi) return this.hi = val
    return val
  }

  limit(val) {
    if (val < this.lo) return this.lo
    if (val > this.hi) return this.hi
    return val
  }

  restrict(val) {
    const delta = this.hi - this.lo
    while (val < this.lo) val += delta
    while (val > this.hi) val -= delta
    return val
  }
}
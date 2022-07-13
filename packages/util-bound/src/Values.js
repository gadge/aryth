export class BVector extends Array {
  lo
  hi
  constructor() { super() }
  build() { return new BVector() }
  get max() { return this.hi }
  get min() { return this.lo }
  set(i, v) { this[i] = (v > (this.hi ?? (this.hi = this.lo = v)) ? (this.hi = v) : v < this.lo ? (this.lo = v) : v) }
  collect(iter, lo = 0) {
    for (let v of iter) { this.set(lo++, v) }
    return { lo: this.lo, hi: this.hi }
  }
  spec() { return { lo: this.lo, hi: this.hi } }
}

export class BMatrix extends BVector {
  build() { return new BMatrix() }
  set(i, j, v) {
    const row = this[i] ?? (this[i] = []), lo = this.lo ?? (this.lo = v), hi = this.hi ?? (this.hi = v)
    row[j] = (v > hi ? (this.hi = v) : v < lo ? (this.lo = v) : v)
  }
}
import { gather } from '@vect/vector-init'

export class Values extends Array {
  lo
  hi
  constructor(lo = Number.POSITIVE_INFINITY, hi = Number.NEGATIVE_INFINITY) {
    super()
    this.lo = lo
    this.hi = hi
  }
  static build() { return new Values() }
  get max() { return this.hi }
  get min() { return this.lo }
  set(i, v) { this[i] = (v > this.hi ? (this.hi = v) : v < this.lo ? (this.lo = v) : v) }
  collect(iter, lo = 0) { for (let v of iter) { this.set(lo++, v) } }
}

export class Bounds extends Array {
  constructor(hi = 0) { super(hi) }
  collect(iter) {
    const count = this.length
    if (count === 0) return gather(iter)
    if (count === 1) return this.recordSingle(iter)
    if (count === 2) return this.recordDouble(iter)
    if (count === 3) return this.recordTriple(iter)
    return this.recordMultiple(iter)
  }
  get x() { return this[0] }
  get y() { return this[1] }
  get z() { return this[2] }

  recordSingle(iter, lo = 0) {
    const [x] = this, xs = Values.build()
    for (let v of iter) { if (x.by(v)) { xs.set(lo++, x.to(v)) } }
    return [xs]
  }
  recordDouble(iter, lo = 0) {
    const [x, y] = this, xs = Values.build(), ys = Values.build()
    for (let v of iter) { if (x.by(v)) { xs.set(lo++, x.to(v)) } else if (y.by(v)) { ys.set(lo++, y.to(v)) } }
    return [xs, ys]
  }
  recordTriple(iter, lo = 0) {
    const [x, y, z] = this
    const xs = Values.build(), ys = Values.build(), zs = Values.build()
    for (let v of iter) { if (x.by(v)) { xs.set(lo++, x.to(v)) } else if (y.by(v)) { ys.set(lo++, y.to(v)) } else if (z.by(v)) { zs.set(lo++, z.to(v)) } }
    return [xs, ys, zs]
  }
  recordMultiple(iter, lo = 0) {
    const rows = []
    for (let v of iter) {
      for (let i = 0; i < rows.length; i++) {
        if (this[i].by(v)) {
          (rows[i] ?? (rows[i] = Values.build())).set(lo++, this[i].to(v))
          break
        }
      }
    }
    return rows
  }
}
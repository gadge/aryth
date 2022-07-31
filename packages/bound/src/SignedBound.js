import { Bound }    from './Bound.js'
import { MAX, MIN } from './constants.js'


export class SignedBound {
  pos
  neg
  constructor(posLo = MAX, posHi = MIN, negLo = MAX, negHi = MIN) {
    this.pos = new Bound(posLo, posHi)
    this.neg = new Bound(negLo, negHi)
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
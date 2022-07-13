import { BVector }      from '../src/Values'
import { strategies }   from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'

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
  collect(iter, lo = 0) {
    for (let v of iter) { this.set(lo++, v) }
    return { lo: this.lo, hi: this.hi }
  }

}

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    raw: [0, 0, 0],
    foo: [1, 7, 5, 9, 3, 3, 9, 5, 7, 1],
    pos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    neg: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    spa: [NaN, 1, void 0, 2, null, 3, NaN, 4]
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    cla: vec => new BVector().collect(vec),
    rea: vec => new Values().collect(vec),
    arc: vec => {
      const list = []
      for (let i = 0, v; i < vec.length; i++) {
        list[i] = (v = vec[i]) > (list.hi ?? (list.hi = list.lo = v)) ? (list.hi = v) : v < list.lo ? (list.lo = v) : v
      }
      return { lo: list.lo, hi: list.hi }
    },
    dev: x => x,
    fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
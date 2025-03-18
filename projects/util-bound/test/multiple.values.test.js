import { BVector }    from '../src/Values.js'
import { strategies } from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'
import { isLiteral }    from '@typen/literal'
import { stringValue }  from '@texting/string-value'
import { parseNum }     from '@typen/numeral'
import { isNumeric }    from '@texting/charset-halfwidth'
import { inferType }    from '@typen/num-strict'
import { NUM, STR }     from '@typen/enum-data-types'

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
  set(i, v) { this[i] = v > this.hi ? (this.hi = v) : v < this.lo ? (this.lo = v) : v }
  collect(iter, lo = 0) {
    for (let v of iter) { this.set(lo++, v) }
    return { lo: this.lo, hi: this.hi }
  }

}

export function recordTriple(iter, lo) {
  const [x, y, z] = this
  const xs = Values.build(), ys = Values.build(), zs = Values.build()
  for (let v of iter) { if (x.by(v)) { xs.set(lo++, x.to(v)) } else if (y.by(v)) { ys.set(lo++, y.to(v)) } else if (z.by(v)) { zs.set(lo++, z.to(v)) } }
  return [xs, ys, zs]
}

export class Some {
  t
  v
  constructor(t, v) { this.t = t, this.v = v }
  static of(t, v) { return new Some(t, v) }
  static refer(v) {
    v = String(v)
    if (isNumeric(v)) {
      v = parseNum(v)
      return { t: v > 0 ? '+' : v < 0 ? '-' : '0', v: parseNum(v) }
    }
    if (isLiteral(v)) { return { t: 'w', v: stringValue(v) } }
    return { t: '.', v: v }
  }
}

export class PreCtx {
  str = { by: isLiteral, to: stringValue }
  pos = { by: x => x > 0, to: parseNum }
  neg = { by: x => x < 0, to: parseNum }
  constructor() {

  }
  get pos() { return this[0] }
  get neg() { return this[1] }
  get str() { return this[2] }
  parse(v) {


  }
  static of(pos, neg, str) { return new PreCtx(pos, neg, str) }
}

export class Bar {
  lo
  hi
  constructor() {}
  update(v) {
    if (v > (this.hi ?? (this.hi = this.lo = v))) { this.hi = v } else if (v < this.lo) { this.lo = v }
  }
}

/**
 * @type {{lapse:Crostab,result:Crostab}}
 */
const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    raw: [0, 0, 0],
    foo: [-1, 7, -5, 9, -3, 3, -9, 5, -7, 1],
    pos: [1, 'b', 3, 'd', 5, 'f', 7, 'h', 9, 'j'],
    neg: [10, '9', 8, '7', 6, '5', 4, '3', 2, '1'],
    spa: [NaN, 1, void 0, 2, null, 3, NaN, 4],
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    cla: vec => new BVector().collect(vec),
    rea: vec => new Values().collect(vec),
    arc: vec => {
      const num = new BVector(), str = new BVector()
      for (let i = 0, v; i < vec.length; i++) {
        v = vec[i]
        if (typeof v === NUM) {
          num.set(i, v)
        } else if (typeof v === STR) {
          if (isNumeric(v)) { num.set(i, parseNum(v)) } else { str.set(i, stringValue(v)) }
        }
      }
      return { num, str }
    },
    dev: vec => vec.map(Some.refer),
    fut: vec => {
      let nHi, nLo, tHi, tLo
      for (let i = 0, v, n; i < vec.length; i++) {
        v = vec[i]
        const type = inferType(v)
        if (type === NUM) {
          n = +v
          if (n > (nHi ?? (nHi = nLo = n))) { nHi = n } else if (n < nLo) { nLo = n }
          continue
        }
        if (type === STR) {
          n = stringValue(v)
          if (n > (tHi ?? (tHi = tLo = n))) { tHi = n } else if (n < tLo) { tLo = n }
          continue
        }
      }
      return { nLo, nHi, tLo, tHi }
    },
    zen: vec => {
      const num = new BVector(), str = new BVector()
      for (let i = 0, v, t; i < vec.length; i++) {
        v = vec[i], t = typeof v
        if (t === NUM) {
          num.set(i, v)
        } else if (t === STR) {
          if (isNumeric(v)) { num.set(i, parseNum(v)) } else { str.set(i, stringValue(v)) }
        }
      }
      return { num, str }
    }
  }
})
lapse |> decoCrostab |> says['lapse']
// result |> decoCrostab |> says['result']
const arc = result.slice(), dev = result.slice(), fut = result.slice()
arc.headward.select(['arc'])
dev.headward.select(['dev'])
fut.headward.select(['fut'])
arc |> decoCrostab |> says['arc']
dev |> decoCrostab |> says['dev']
fut |> decoCrostab |> says['fut']
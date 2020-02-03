import { Ar, Ob, Mx } from 'veho'
import { ArrX } from 'xbrief'
import { Stat } from 'borel'
import { splitCuts } from './utils/splitCuts'

export class Histo {
  /** @type{Array<number>} */ #cuts
  /** @type{Map<number,number>} */ #buckets
  /** @type{number} */ mean
  /** @type{number} */ stdev
  /** @type{number} */ hi

  constructor (mean, stdev, sep) {
    this.cuts = splitCuts(mean, stdev, sep)
    this.mean = mean
    this.stdev = stdev
  }

  set cuts (cuts) {
    this.#cuts = cuts
    const buckets = new Map()
    for (let i = -1; i < cuts.length + 1; i++) buckets.set(i, 0)
    this.#buckets = buckets
    this.hi = cuts.length - 1
  }

  get cuts () {
    return this.#cuts
  }

  /**
   * // Xr('').x(Math.round(x)).p('compared to id')[id](el) |> logger
   * // Xr('pos', 'out').cuts(ar).num(Math.round(x)).id(lo).low(lo).high(hi) |> logger
   * // if (lo - hi !== 1) throw `[locate error] (lo - hi !== 1) [x] (${x}) [lo] (${lo}) [hi] (${hi}) [ar] (${ar})`
   * @param {number} x
   * @returns {number}
   */
  locate (x) {
    const ar = this.#cuts
    let i, lo = 0, hi = this.hi
    while (lo <= hi) {
      x < ar[i = ~~((lo + hi) >> 1)] ? hi = --i : lo = ++i
    }
    return hi
  }

  collect (x) {
    const mp = this.#buckets, i = this.locate(x)
    mp.set(i, mp.get(i) + 1)
    return this
  }

  get bound () {
    return {
      min: this.#cuts[0],
      max: this.#cuts[this.hi] + this.stdev,
    }
  }

  intervals (type = 'string') {
    const { min, max } = this.bound
    let bins
    switch (type) {
      case 'string':
        bins = this.cuts.map(x => [String(x), String(x + this.stdev)])
        bins.unshift(['-∞', String(min)])
        bins.push([String(max), '+∞'])
        return bins
      case 'number':
      default:
        bins = this.cuts.map(x => [x, x + this.stdev])
        bins.unshift([Number.NEGATIVE_INFINITY, min])
        bins.push([max, Number.POSITIVE_INFINITY])
        return bins
    }
  }

  get count () {
    return Stat.sum([...this.#buckets.values()])
  }

  statistics (type = 'string') {
    const
      intervals = this.intervals(type),
      [l, r] = Mx.columns(intervals, ArrX.maxLen)
    Ar.mutateMap(intervals, ([k, v]) => `[${k.padStart(l)}, ${v.padStart(r)})`)
    return Ob.ini(intervals, Array.from(this.#buckets.values()))
  }
}







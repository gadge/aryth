import { bound }     from '@aryth/bound-vector'
import { NiceScale } from '@aryth/nice-scale'
import { lange }                   from '@spare/lange'
import { LPad }                    from '@spare/pad-string'
import { NUM, STR }                from '@typen/enum-data-types'
import { maxBy as entriesMaxBy }   from '@vect/entries-indicator'
import { wind as windEntries }     from '@vect/entries-init'
import { wind as windObject }      from '@vect/object-init'
import { mutate }                  from '@vect/vector-mapper'
import { tickLabels, ticksByMean } from './utils/ticksByMean.js'

const lpad = LPad({ ansi: false })

export class Histo {
  /** @type{Array<number>} */ #ticks
  /** @type{Map<number,number>} */ #tickmap
  /** @type{number} */ gaps

  constructor (tickLabels) {
    this.ticks = tickLabels
  }

  static buildByMean (mean, stdev, gaps) {
    const ticks = ticksByMean(mean, stdev, gaps)
    return new Histo(ticks)
  }

  static build (min, step, gaps) {
    const ticks = tickLabels(min, step, gaps)
    return new Histo(ticks)
  }

  static fromSamples (samples, maxTicks = 10) {
    const niceScale = NiceScale({ ticks: maxTicks })
    const tickLabels = niceScale(bound(samples))
    const histo = new Histo(tickLabels)
    for (let sample of samples) histo.collect(sample)
    return histo
  }

  set ticks (tickLabels) {
    let map, i = -1
    this.#ticks = tickLabels
    this.#tickmap = map = new Map()
    const l = tickLabels.length
    while (i <= l) map.set(i++, 0) // min-1 and max+1 are both added
    this.gaps = l - 1
  }

  get ticks () { return this.#ticks }

  /**
   * // Xr(step++).value(x).low(lo).mid(mid).p(ar[mid]).high(gaps) |> logger
   * // Xr(step++).value(x).low(lo).mid(null).gaps(gaps) |> logger
   * // if (lo - gaps !== 1) throw `[locate error] (lo - gaps !== 1) [x] (${x}) [lo] (${lo}) [gaps] (${gaps}) [ar] (${ar})`
   * @param {number} x
   * @returns {number}
   */
  locate (x) {
    const ve = this.#ticks
    let lo = 0, hi = this.gaps + 1, md
    do {
      x >= ve[md = ~~((lo + hi) >> 1)] ? lo = ++md : hi = --md
    } while (lo <= hi)
    return hi
  }

  collect (x) {
    const mp = this.#tickmap, i = this.locate(x)
    mp.set(i, mp.get(i) + 1)
    return this
  }

  get bound () {
    return {
      min: this.#ticks[0],
      max: this.#ticks[this.gaps],
    }
  }

  intervals (type = STR) {
    if (type === STR) {
      const chips = Array(this.gaps + 1)
      const max = this.#ticks.reduce((a, b, i) =>
        (chips[i] = [String(a), b = String(b)], b), '-∞')
      chips.push([max, '+∞'])
      return chips
    }
    if (type === NUM) {
      const chips = Array(this.gaps + 1)
      const max = this.#ticks.reduce((a, b, i) =>
        (chips[i] = [a, b], b), Number.NEGATIVE_INFINITY)
      chips.push([max, Number.POSITIVE_INFINITY])
      return chips
    }
    return this.#ticks
  }

  get count () {
    let sum = 0
    for (let v of this.#tickmap.values()) sum += v
    return sum
  }

  statistics ({ keyType = STR, objectify = true } = {}) {
    const intervals = this.intervals(keyType)
    if (keyType === STR) {
      const [l, r] = entriesMaxBy(intervals, lange, lange)
      mutate(intervals, ([k, v]) => `[${lpad(k, l)}, ${lpad(v, r)})`)
    }
    return objectify
      ? windObject(intervals, [...this.#tickmap.values()])
      : windEntries(intervals, [...this.#tickmap.values()])
  }
}

import { bound } from '@aryth/bound-vector';
import { NiceScale } from '@aryth/nice-scale';
import { lange } from '@spare/lange';
import { LPad } from '@spare/pad-string';
import { STR, NUM } from '@typen/enum-data-types';
import { maxBy } from '@vect/entries-indicator';
import { wind as wind$1 } from '@vect/entries-init';
import { wind } from '@vect/object-init';
import { mutate } from '@vect/vector-mapper';
import { round } from '@aryth/math';

var id = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

const isEven = n => !(n % 2);
const ticksByMean = (mean, stdev, gaps) => {
  const ticks = (gaps = round(gaps)) + 1;
  let lo = mean - stdev * (ticks >> 1);
  if (isEven(ticks)) lo += stdev / 2;
  return tickLabels(lo, stdev, gaps);
};
const tickLabels = (lo, step, gaps) => {
  const ve = Array(gaps + 1);
  let i = 0;

  do {
    ve[i++] = lo, lo += step;
  } while (i <= gaps);

  return ve;
};

const lpad = LPad({
  ansi: false
});

var _ticks = _classPrivateFieldLooseKey("ticks");

var _tickmap = _classPrivateFieldLooseKey("tickmap");

class Histo {
  /** @type{Array<number>} */

  /** @type{Map<number,number>} */

  /** @type{number} */
  constructor(tickLabels) {
    Object.defineProperty(this, _ticks, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _tickmap, {
      writable: true,
      value: void 0
    });
    this.gaps = void 0;
    this.ticks = tickLabels;
  }

  static buildByMean(mean, stdev, gaps) {
    const ticks = ticksByMean(mean, stdev, gaps);
    return new Histo(ticks);
  }

  static build(min, step, gaps) {
    const ticks = tickLabels(min, step, gaps);
    return new Histo(ticks);
  }

  static fromSamples(samples, maxTicks = 10) {
    const niceScale = NiceScale({
      ticks: maxTicks
    });
    const tickLabels = niceScale(bound(samples));
    const histo = new Histo(tickLabels);

    for (let sample of samples) histo.collect(sample);

    return histo;
  }

  set ticks(tickLabels) {
    let map,
        i = -1;
    _classPrivateFieldLooseBase(this, _ticks)[_ticks] = tickLabels;
    _classPrivateFieldLooseBase(this, _tickmap)[_tickmap] = map = new Map();
    const l = tickLabels.length;

    while (i <= l) map.set(i++, 0); // min-1 and max+1 are both added


    this.gaps = l - 1;
  }

  get ticks() {
    return _classPrivateFieldLooseBase(this, _ticks)[_ticks];
  }
  /**
   * // Xr(step++).value(x).low(lo).mid(mid).p(ar[mid]).high(gaps) |> logger
   * // Xr(step++).value(x).low(lo).mid(null).gaps(gaps) |> logger
   * // if (lo - gaps !== 1) throw `[locate error] (lo - gaps !== 1) [x] (${x}) [lo] (${lo}) [gaps] (${gaps}) [ar] (${ar})`
   * @param {number} x
   * @returns {number}
   */


  locate(x) {
    const ve = _classPrivateFieldLooseBase(this, _ticks)[_ticks];

    let lo = 0,
        hi = this.gaps + 1,
        md;

    do {
      x >= ve[md = ~~(lo + hi >> 1)] ? lo = ++md : hi = --md;
    } while (lo <= hi);

    return hi;
  }

  collect(x) {
    const mp = _classPrivateFieldLooseBase(this, _tickmap)[_tickmap],
          i = this.locate(x);

    mp.set(i, mp.get(i) + 1);
    return this;
  }

  get bound() {
    return {
      min: _classPrivateFieldLooseBase(this, _ticks)[_ticks][0],
      max: _classPrivateFieldLooseBase(this, _ticks)[_ticks][this.gaps]
    };
  }

  intervals(type = STR) {
    if (type === STR) {
      const chips = Array(this.gaps + 1);

      const max = _classPrivateFieldLooseBase(this, _ticks)[_ticks].reduce((a, b, i) => (chips[i] = [String(a), b = String(b)], b), '-∞');

      chips.push([max, '+∞']);
      return chips;
    }

    if (type === NUM) {
      const chips = Array(this.gaps + 1);

      const max = _classPrivateFieldLooseBase(this, _ticks)[_ticks].reduce((a, b, i) => (chips[i] = [a, b], b), Number.NEGATIVE_INFINITY);

      chips.push([max, Number.POSITIVE_INFINITY]);
      return chips;
    }

    return _classPrivateFieldLooseBase(this, _ticks)[_ticks];
  }

  get count() {
    let sum = 0;

    for (let v of _classPrivateFieldLooseBase(this, _tickmap)[_tickmap].values()) sum += v;

    return sum;
  }

  statistics({
    keyType = STR,
    objectify = true
  } = {}) {
    const intervals = this.intervals(keyType);

    if (keyType === STR) {
      const [l, r] = maxBy(intervals, lange, lange);
      mutate(intervals, ([k, v]) => `[${lpad(k, l)}, ${lpad(v, r)})`);
    }

    return objectify ? wind(intervals, [..._classPrivateFieldLooseBase(this, _tickmap)[_tickmap].values()]) : wind$1(intervals, [..._classPrivateFieldLooseBase(this, _tickmap)[_tickmap].values()]);
  }

}

export { Histo, ticksByMean };

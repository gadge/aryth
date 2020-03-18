'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumDataTypes = require('@typen/enum-data-types');
var lange = require('@spare/lange');
var padString = require('@spare/pad-string');
var vectorMapper = require('@vect/vector-mapper');
var objectInit = require('@vect/object-init');
var entriesIndicator = require('@vect/entries-indicator');
var boundVector = require('@aryth/bound-vector');
var niceScale = require('@aryth/nice-scale');
var math = require('@aryth/math');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

const isEven = n => !(n % 2);
const ticksByMean = (mean, stdev, gaps) => {
  const ticks = (gaps = math.round(gaps)) + 1;
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

const lpad = padString.LPad({
  ansi: false
});
class Histo {
  /** @type{Array<number>} */

  /** @type{Map<number,number>} */

  /** @type{number} */
  constructor(tickLabels) {
    _ticks.set(this, {
      writable: true,
      value: void 0
    });

    _tickmap.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "gaps", void 0);

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
    const niceScale$1 = niceScale.NiceScale({
      ticks: maxTicks
    });
    const tickLabels = niceScale$1(boundVector.bound(samples));
    const histo = new Histo(tickLabels);

    for (let sample of samples) histo.collect(sample);

    return histo;
  }

  set ticks(tickLabels) {
    let map,
        i = -1;

    _classPrivateFieldSet(this, _ticks, tickLabels);

    _classPrivateFieldSet(this, _tickmap, map = new Map());

    const l = tickLabels.length;

    while (i <= l) map.set(i++, 0); // min-1 and max+1 are both added


    this.gaps = l - 1;
  }

  get ticks() {
    return _classPrivateFieldGet(this, _ticks);
  }
  /**
   * // Xr(step++).value(x).low(lo).mid(mid).p(ar[mid]).high(gaps) |> logger
   * // Xr(step++).value(x).low(lo).mid(null).gaps(gaps) |> logger
   * // if (lo - gaps !== 1) throw `[locate error] (lo - gaps !== 1) [x] (${x}) [lo] (${lo}) [gaps] (${gaps}) [ar] (${ar})`
   * @param {number} x
   * @returns {number}
   */


  locate(x) {
    const ve = _classPrivateFieldGet(this, _ticks);

    let lo = 0,
        hi = this.gaps + 1,
        md;

    do {
      x >= ve[md = ~~(lo + hi >> 1)] ? lo = ++md : hi = --md;
    } while (lo <= hi);

    return hi;
  }

  collect(x) {
    const mp = _classPrivateFieldGet(this, _tickmap),
          i = this.locate(x);

    mp.set(i, mp.get(i) + 1);
    return this;
  }

  get bound() {
    return {
      min: _classPrivateFieldGet(this, _ticks)[0],
      max: _classPrivateFieldGet(this, _ticks)[this.gaps]
    };
  }

  intervals(type = enumDataTypes.STR) {
    if (type === enumDataTypes.STR) {
      const chips = Array(this.gaps + 1);

      const max = _classPrivateFieldGet(this, _ticks).reduce((a, b, i) => (chips[i] = [String(a), b = String(b)], b), '-∞');

      chips.push([max, '+∞']);
      return chips;
    }

    if (type === enumDataTypes.NUM) {
      const chips = Array(this.gaps + 1);

      const max = _classPrivateFieldGet(this, _ticks).reduce((a, b, i) => (chips[i] = [a, b], b), Number.NEGATIVE_INFINITY);

      chips.push([max, Number.POSITIVE_INFINITY]);
      return chips;
    }

    return _classPrivateFieldGet(this, _ticks);
  }

  get count() {
    let sum = 0;

    for (let v of _classPrivateFieldGet(this, _tickmap).values()) sum += v;

    return sum;
  }

  statistics(type = enumDataTypes.STR) {
    const intervals = this.intervals(type),
          [l, r] = entriesIndicator.maxBy(intervals, lange.lange, lange.lange);
    vectorMapper.mutate(intervals, ([k, v]) => `[${lpad(k, l)}, ${lpad(v, r)})`);
    return objectInit.wind(intervals, [..._classPrivateFieldGet(this, _tickmap).values()]);
  }

}

var _ticks = new WeakMap();

var _tickmap = new WeakMap();

exports.Histo = Histo;
exports.ticksByMean = ticksByMean;

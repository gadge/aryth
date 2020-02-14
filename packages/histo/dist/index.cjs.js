'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var veho = require('veho');
var xbrief = require('xbrief');
var borel = require('borel');

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

const splitCuts = (mean, stdev, sep) => {
  sep = Math.round(sep);
  const arr = [];
  let mark = mean - stdev * ((sep >> 1) + 1) - (sep % 2 ? stdev / 2 : 0);

  for (let i = 0; i <= sep; i++) arr.push(mark += stdev);

  return arr;
};

class Histo {
  /** @type{Array<number>} */

  /** @type{Map<number,number>} */

  /** @type{number} */

  /** @type{number} */

  /** @type{number} */
  constructor(mean, stdev, sep) {
    _cuts.set(this, {
      writable: true,
      value: void 0
    });

    _buckets.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "mean", void 0);

    _defineProperty(this, "stdev", void 0);

    _defineProperty(this, "hi", void 0);

    this.cuts = splitCuts(mean, stdev, sep);
    this.mean = mean;
    this.stdev = stdev;
  }

  set cuts(cuts) {
    var _Xr$value;

    _classPrivateFieldSet(this, _cuts, cuts);

    const buckets = new Map();

    for (let i = -1; i < cuts.length + 1; i++) buckets.set(i, 0);

    _classPrivateFieldSet(this, _buckets, buckets);

    this.hi = cuts.length - 1;
    _Xr$value = xbrief.Xr('initiated hi value').value(this.hi + 1), xbrief.logger(_Xr$value);
  }

  get cuts() {
    return _classPrivateFieldGet(this, _cuts);
  }
  /**
   * // Xr(step++).value(x).low(lo).mid(mid).p(ar[mid]).high(hi) |> logger
   * // Xr(step++).value(x).low(lo).mid(null).hi(hi) |> logger
   * // if (lo - hi !== 1) throw `[locate error] (lo - hi !== 1) [x] (${x}) [lo] (${lo}) [hi] (${hi}) [ar] (${ar})`
   * @param {number} x
   * @returns {number}
   */


  locate(x) {
    const ar = _classPrivateFieldGet(this, _cuts);

    let lo = 0,
        hi = this.hi + 1,
        mid;

    do {
      x >= ar[mid = ~~(lo + hi >> 1)] ? lo = ++mid : hi = --mid;
    } while (lo <= hi);

    return hi;
  }

  collect(x) {
    const mp = _classPrivateFieldGet(this, _buckets),
          i = this.locate(x);

    mp.set(i, mp.get(i) + 1);
    return this;
  }

  get bound() {
    return {
      min: _classPrivateFieldGet(this, _cuts)[0],
      max: _classPrivateFieldGet(this, _cuts)[this.hi]
    };
  }

  intervals(type = 'string') {
    const {
      min,
      max
    } = this.bound;
    let bins;

    switch (type) {
      case 'string':
        bins = this.cuts.map(x => [String(x), String(x + this.stdev)]);
        bins.pop();
        bins.unshift(['-∞', String(min)]);
        bins.push([String(max), '+∞']);
        return bins;

      case 'number':
      default:
        bins = this.cuts.map(x => [x, x + this.stdev]);
        bins.pop();
        bins.unshift([Number.NEGATIVE_INFINITY, min]);
        bins.push([max, Number.POSITIVE_INFINITY]);
        return bins;
    }
  }

  get count() {
    return borel.Stat.sum([..._classPrivateFieldGet(this, _buckets).values()]);
  }

  statistics(type = 'string') {
    const intervals = this.intervals(type),
          [l, r] = veho.Mx.columns(intervals, xbrief.ArrX.maxLen);
    veho.Ar.mutateMap(intervals, ([k, v]) => `[${k.padStart(l)}, ${v.padStart(r)})`);
    return veho.Ob.ini(intervals, Array.from(_classPrivateFieldGet(this, _buckets).values()));
  }

}

var _cuts = new WeakMap();

var _buckets = new WeakMap();

exports.Histo = Histo;
exports.splitCuts = splitCuts;

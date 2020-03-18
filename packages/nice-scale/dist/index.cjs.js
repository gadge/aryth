'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumObjectTypes = require('@typen/enum-object-types');
var math = require('@aryth/math');

/**
 * Calculate and update values for tick spacing and nice
 * minimum and maximum data points on the axis.
 */

function niceScale({
  min: lo,
  max: hi
}) {
  const {
    ticks = 10,
    mode = enumObjectTypes.ARRAY
  } = this || {};
  const delta = niceNum(hi - lo, false);
  const step = niceNum(delta / (ticks - 1), true);
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  if (mode === enumObjectTypes.OBJECT) return {
    min,
    max,
    step
  };
  if (mode === enumObjectTypes.ARRAY) return tickLabels(min, step, math.round((max - min) / step));
  return {
    min,
    max,
    step
  };
}
/**
 *
 * @param options
 * @param {number} [options.ticks = 10]
 * @param {string} [options.mode = ARRAY] - optional, if ARRAY, return tick labels; if OBJECT, return {min,max,step}
 * @return {Function|function(number,number):*}
 */

const NiceScale = (options = {}) => niceScale.bind(options);
const tickLabels = (lo, step, gaps) => {
  const ve = Array(gaps + 1);
  let i = 0;

  do {
    ve[i++] = lo, lo += step;
  } while (i <= gaps);

  return ve;
};
/**
 * Returns a "nice" number approximately equal to range Rounds
 * the number if round = true Takes the ceiling if round = false.
 *
 * @param {number} range - the data range
 * @param {boolean} round - whether to round the result
 * @return {number} a "nice" number to be used for the data range
 */

function niceNum(range, round = true) {
  const expon = ~~Math.log10(range); // exponent of range

  const frac = range / 10 ** expon; // fractional part of range

  const niceFrac = round
  /** nice, rounded fraction */
  ? niceFractionRound(frac) : niceFraction(frac);
  return niceFrac * 10 ** expon;
}

const niceFractionRound = frac => {
  if (frac < 1.5) return 1;
  if (frac < 3) return 2;
  if (frac < 7) return 5;else return 10;
};

const niceFraction = frac => {
  if (frac <= 1) return 1;
  if (frac <= 2) return 2;
  if (frac <= 5) return 5;else return 10;
};

exports.NiceScale = NiceScale;
exports.niceScale = niceScale;

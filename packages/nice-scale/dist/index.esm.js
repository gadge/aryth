import { round } from '@aryth/math';
import { OBJECT, ARRAY } from '@typen/enum-object-types';

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
    mode = ARRAY
  } = this ?? {};
  const delta = niceNum(hi - lo, false),
        step = niceNum(delta / (ticks - 1), true),
        min = Math.floor(lo / step) * step,
        max = Math.ceil(hi / step) * step;
  if (mode === OBJECT) return {
    min,
    max,
    step
  };
  if (mode === ARRAY) return tickLabels(min, step, round((max - min) / step));
  return {
    min,
    max,
    step
  };
}
/**
 *
 * @param {Object} options
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
  const expon = ~~Math.log10(range),
        // exponent of range
  frac = range / 10 ** expon,
        // fractional part of range
  niceFrac = round
  /** nice, rounded fraction */
  ? niceFractionRound(frac) : niceFraction(frac);
  return niceFrac * 10 ** expon;
}

const niceFractionRound = frac => {
  if (frac < 1.5) return 1;
  if (frac < 3) return 2;
  if (frac < 7) return 5;
  return 10;
};

const niceFraction = frac => {
  if (frac <= 1) return 1;
  if (frac <= 2) return 2;
  if (frac <= 5) return 5;
  return 10;
};

export { NiceScale, niceScale };

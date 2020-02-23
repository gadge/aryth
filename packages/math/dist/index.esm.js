const abs = n => n < 0 ? 0 - n : n;
/**
 * @param {number} x
 * @returns {number}
 */

const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;
/**
 * Get an integer absolute of a number
 * @param {number} n
 * @returns {number}
 */

const intAbs = n => {
  const mk = n >> 31;
  return (mk ^ n) - mk;
};
/**
 *
 * @param {number} x
 * @returns {number}
 */

const intExpon = x => ~~Math.log10(x);
const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon;
const almostInt = (x, epsilon) => Math.abs(x - round(x)) < epsilon;

export { abs, almostEquals, almostInt, intAbs, intExpon, round };

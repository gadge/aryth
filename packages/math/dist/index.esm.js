const abs = n => n < 0 ? 0 - n : n;
/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */

const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;
const E2 = 1E+2;
const E4 = 1E+4;
const MILLION = 1E+6;
const roundD1 = x => Math.round(x * 10) / 10;
const roundD2 = x => Math.round(x * E2) / E2;
const roundD4 = x => Math.round(x * E4) / E4; // export const roundD2=x=>Math.round()

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

export { E2, E4, MILLION, abs, almostEquals, almostInt, intAbs, intExpon, round, roundD1, roundD2, roundD4 };

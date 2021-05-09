'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const abs = n => n < 0 ? 0 - n : n;
/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */

const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;
const constraint = (x, min, max) => x > max ? max : x < min ? min : x;
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

exports.E2 = E2;
exports.E4 = E4;
exports.MILLION = MILLION;
exports.abs = abs;
exports.almostEquals = almostEquals;
exports.almostInt = almostInt;
exports.constraint = constraint;
exports.intAbs = intAbs;
exports.intExpon = intExpon;
exports.round = round;
exports.roundD1 = roundD1;
exports.roundD2 = roundD2;
exports.roundD4 = roundD4;

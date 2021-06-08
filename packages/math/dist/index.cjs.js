'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const E1 = 10; // E1

const E4 = 10_000; // E4

const E7 = 10_000_000; // E7

const E10 = 10_000_000_000; // E10

const E13 = 10_000_000_000_000; // E13

const E2 = 100; // E2

const E5 = 100_000; // E5

const E8 = 100_000_000; // E8

const E11 = 100_000_000_000; // E11

const E14 = 100_000_000_000_000; // E14

const E3 = 1_000; // E3

const E6 = 1_000_000; // E6

const E9 = 1_000_000_000; // E9

const E12 = 1_000_000_000_000; // E12

const E15 = 1_000_000_000_000_000; // E15

/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */

const round = x => x + (x > 0 ? 0.5 : -0.5) << 0;
const roundD1 = x => Math.round(x * 10) / 10;
const roundD2 = x => Math.round(x * E2) / E2;
const roundD3 = x => Math.round(x * E3) / E3;
const roundD4 = x => Math.round(x * E4) / E4;

function abbr(num) {
  if (!num) return 0;
  if (-0.01 < num && num < 0.01) return num.toExponential(1);
  if (-E3 < num && num < E3) return roundD2(num);
  const sign = num > 0 ? '' : '-',
        abs = Math.abs(num);
  if (abs < E6) return sign + round(abs / E1) / 100 + "k";
  if (abs < E9) return sign + round(abs / E4) / 100 + "m";
  if (abs < E12) return sign + round(abs / E7) / 100 + "b";
  if (abs < E15) return sign + round(abs / E10) / 100 + "t";
  return sign + round(abs / E13) * 100 + "q";
}

const abs = n => n < 0 ? 0 - n : n;
/**
 * Get an integer absolute of a number
 * @param {number} n
 * @returns {number}
 */

const intAbs = n => {
  const mk = n >> 31;
  return (mk ^ n) - mk;
};

const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon;
const almostInt = (x, epsilon) => Math.abs(x - round(x)) < epsilon;

const constraint = (x, min, max) => x > max ? max : x < min ? min : x;

/**
 *
 * @param {number} x
 * @returns {number}
 */
const intExpon = x => ~~Math.log10(x);

exports.E1 = E1;
exports.E10 = E10;
exports.E11 = E11;
exports.E12 = E12;
exports.E13 = E13;
exports.E14 = E14;
exports.E15 = E15;
exports.E2 = E2;
exports.E3 = E3;
exports.E4 = E4;
exports.E5 = E5;
exports.E6 = E6;
exports.E7 = E7;
exports.E8 = E8;
exports.E9 = E9;
exports.abbr = abbr;
exports.abs = abs;
exports.almostEquals = almostEquals;
exports.almostInt = almostInt;
exports.constraint = constraint;
exports.intAbs = intAbs;
exports.intExpon = intExpon;
exports.round = round;
exports.roundD1 = roundD1;
exports.roundD2 = roundD2;
exports.roundD3 = roundD3;
exports.roundD4 = roundD4;

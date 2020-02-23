export const abs = n => n < 0 ? 0 - n : n

/**
 * @param {number} x
 * @returns {number}
 */
export const round = x => (x + (x > 0 ? 0.5 : -0.5)) << 0

/**
 * Get an integer absolute of a number
 * @param {number} n
 * @returns {number}
 */
export const intAbs = n => {
  const mk = n >> 31
  return (mk ^ n) - mk
}

/**
 *
 * @param {number} x
 * @returns {number}
 */
export const intExpon = x => ~~(Math.log10(x))

export const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon

export const almostInt = (x, epsilon) => Math.abs(x - round(x)) < epsilon


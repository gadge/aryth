export const abs = n => n < 0 ? 0 - n : n

/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */
export const round = x => (x + (x > 0 ? 0.5 : -0.5)) << 0
export const constraint = (x, min, max) => x > max ? max : x < min ? min : x

export const E2 = 1E+2
export const E4 = 1E+4
export const MILLION = 1E+6

export const roundD1 = x => Math.round(x * 10) / 10
export const roundD2 = x => Math.round(x * E2) / E2
export const roundD4 = x => Math.round(x * E4) / E4

// export const roundD2=x=>Math.round()
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


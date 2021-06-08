export const abs = n => n < 0 ? 0 - n : n

/**
 * Get an integer absolute of a number
 * @param {number} n
 * @returns {number}
 */
export const intAbs = n => {
  const mk = n >> 31
  return ( mk ^ n ) - mk
}
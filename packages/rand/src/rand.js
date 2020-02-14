export const { random } = Math

export const rand = l => ~~(random() * l)

/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(exclusive) - int
 * @returns {number} int
 */
export const randInt = (lo, hi) => rand(hi - lo) + lo

/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @returns {number} int
 */
export const randIntBetw = (lo, hi) => rand(++hi - lo) + lo





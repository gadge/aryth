import { E2, E3, E4 } from '../assets/large'

/**
 *
 * applicable for smaller number
 * @param {number} x
 * @returns {number}
 */
export const round = x => ( x + ( x > 0 ? 0.5 : -0.5 ) ) << 0
export const roundD1 = x => Math.round(x * 10) / 10
export const roundD2 = x => Math.round(x * E2) / E2
export const roundD3 = x => Math.round(x * E3) / E3
export const roundD4 = x => Math.round(x * E4) / E4
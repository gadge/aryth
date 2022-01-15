import { round } from './round'

/**
 * @deprecated use almostEqual instead
 * @param x
 * @param y
 * @param epsilon
 * @return {boolean}
 */
export const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon

export const almostEqual = (x, y, epsilon) => Math.abs(x - y) < epsilon

export const almostInt = (x, epsilon) => Math.abs(x - round(x)) < epsilon
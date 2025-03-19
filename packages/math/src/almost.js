/**
 * @deprecated use almostEqual instead
 * @param x
 * @param y
 * @param eps
 * @return {boolean}
 */
export const almostEquals = (x, y, eps) => Math.abs(x - y) < eps

export const almostEqual = (x, y, eps) => Math.abs(x - y) < eps

export const almostInt = (x, eps) => Math.abs(x - Math.round(x)) < eps
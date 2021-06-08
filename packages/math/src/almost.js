import { round } from './round'

export const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon

export const almostInt = (x, epsilon) => Math.abs(x - round(x)) < epsilon
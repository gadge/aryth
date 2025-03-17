export const { random, abs, exp, log, sqrt, pow, cos, sin, PI } = Math
export const randIdx = arr => ~~(random() * arr.length)
export const randSel = arr => arr[randIdx(arr)]
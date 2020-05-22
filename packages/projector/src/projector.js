export const projector = function (n) {
  const { min: m, lever: l, base: b } = this
  return (n - m) * l + b
}

/**
 *
 * @param {Object} x
 * @param {number} x.max
 * @param {number} x.min
 *
 * @param {Object} y
 * @param {number} y.max
 * @param {number} y.min
 *
 * @return {Function|function(number):number}
 */
export const Projector = (x, y) => {
  const { max, min } = x
  const lever = max !== min ? (y.max - y.min) / (max - min) : 0
  const base = y.min
  return projector.bind({ min, lever, base })
}

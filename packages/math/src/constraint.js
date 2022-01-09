export const constraint = (x, min, max) => x > max ? max : x < min ? min : x

export const limit = ({ min, max }, value) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const restrict = ({ min, max }, value) => {
  const delta = max - min
  while (value < min) value += delta
  while (value > max) value -= delta
  return value
}

export const limitAboveZero = (value, max) => {
  if (value < 0) return 0
  if (value > max) return max
  return value
}
export const restrictAboveZero = (value, max) => {
  while (value < 0) value += max
  while (value > max) value -= max
  return value
}
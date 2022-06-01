export const limBy = (x, min, max) => x > max ? max : x < min ? min : x

export const lim = ({ min, max }, value) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const recLim = ({ min, max }, value) => {
  const delta = max - min
  while (value < min) value += delta
  while (value > max) value -= delta
  return value
}

export const lim0up = (value, max) => {
  if (value < 0) return 0
  if (value > max) return max
  return value
}
export const rec0up = (value, max) => {
  while (value < 0) value += max
  while (value > max) value -= max
  return value
}
export const almostIntDev = (x, epsilon) => {
  let rounded = Math.round(x)
  return rounded < x + epsilon && rounded + epsilon > x
}

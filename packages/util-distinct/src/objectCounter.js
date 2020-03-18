export const objectCounter = function (x) {
  x in this
    ? this[x]++
    : this[x] = 1
}

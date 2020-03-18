export const entriesCounter = function (x) {
  let j = this.findIndex(ent => x === ent[0])
  j >= 0
    ? this[j][1]++
    : this.push([x, 1])
}

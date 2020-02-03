export const splitCuts = (mean, stdev, sep) => {
  sep = Math.round(sep)
  const arr = []
  let mark = mean - stdev * ((sep >> 1) + 1) - (sep % 2 ? stdev / 2 : 0)
  for (let i = 0; i < sep; i++) arr.push(mark += stdev)
  return arr
}

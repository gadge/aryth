export { distinct, distinctCount } from './src'

export function distinctByColumn(mx, y) {
  let [ h, w ] = size(mx)
  if (!h || !w || y >= w) return [ [] ]
  let targetMx = []
  for (let i = 0, sourceRow; i < h; i++) {
    sourceRow = mx[i]
    if (targetMx.findIndex(targetRow => targetRow[y] === sourceRow[y]) < 0) targetMx.push(sourceRow)
  }
  return targetMx
}

import { iterate } from '@vect/vector-mapper'

export function duobound(words, [ x, y ] = []) {
  const hi = words?.length
  let veX = null, veY = null
  if (!hi) return [ veX, veY ]
  iterate(words, (v, i) => {
      if (x.by(v) && (veX ?? (veX = Array(hi)))) {
        if ((v = x.to(v)) > (veX.max ?? (veX.max = veX.min = v))) { veX.max = v } else if (v < veX.min) { veX.min = v }
        return veX[i] = v
      }
      if (y.by(v) && (veY ?? (veY = Array(hi)))) {
        if ((v = y.to(v)) > (veY.max ?? (veY.max = veY.min = v))) { veY.max = v } else if (v < veY.min) { veY.min = v }
        return veY[i] = v
      }
      return NaN
    },
    hi)
  return [ veX, veY ]
}

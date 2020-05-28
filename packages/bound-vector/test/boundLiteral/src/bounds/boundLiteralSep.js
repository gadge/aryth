import { PRESETS } from '../../../../src/bounds'

export const boundLiteralSep = (
  words,
  presets = PRESETS,
) => {
  return presets.map(({ filter, mapper }) => {
      let max = undefined, min = undefined
      const vec = words.map(x => {
        if (filter(x)) {
          if ((x = mapper ? mapper(x) : x) > (max ?? (max = min = x))) { return max = x } else if (x < min) { return min = x }
          return x
        }
        return undefined
      })
      vec.max = max
      vec.min = min
      return vec
    }
  )
}

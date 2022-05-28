import { stringValue }  from '@texting/string-value'
import { hasLiteral }   from '@typen/literal'
import { isNumeric }    from '@typen/numeral'
import { parseNumeric } from '../../parseNumeric'

export const PRESETS = [
  { by: isNumeric, to: parseNumeric },
  { by: hasLiteral, to: stringValue }
]


export const boundLiteralSep = (
  words,
  presets = PRESETS,
) => {
  return presets.map(({ by, to }) => {
      let max = undefined, min = undefined
      const vec = words.map(x => {
        if (by(x)) {
          if ((x = to ? to(x) : x) > (max ?? (max = min = x))) { return max = x } else if (x < min) { return min = x }
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

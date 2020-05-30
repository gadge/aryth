import { STR_ASC }     from '@aryth/comparer'
import { hasLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { mapper }      from '@vect/vector-mapper'
import { stringValue } from '../../stringValue'

export const rankLiteralFut = (
  words,
  confNum = { filter: isNumeric, max: 255, min: 0 },
  confStr = { filter: hasLiteral, comparer: STR_ASC }
) => {
  let xa, xb
  let ya, yb
  words = mapper(words, v => {
    if (confNum.filter(v)) {
      if (v >= (xa ?? v)) { xa = v } else if (v <= (xb ?? v)) { xb = v }
      return v
    }
    if (confStr.filter(v)) {
      if ((v = stringValue(v)) >= (ya ?? v)) { ya = v } else if (v <= (yb ?? v)) { yb = v }
      return v //String(v)
    }
    return NaN
  })
  return { words, bounds: [{ max: xa, min: xb }, { max: ya, min: yb }] }
}

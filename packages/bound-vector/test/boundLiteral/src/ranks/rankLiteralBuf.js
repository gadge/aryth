import { STR_ASC }          from '@aryth/comparer'
import { hasLiteral }       from '@typen/literal'
import { isNumeric }        from '@typen/num-loose'
import { mapper }           from '@vect/vector-mapper'
import { stringValueGamma } from '../../stringValue/stringValueGamma'

export const rankLiteralBuf = (
  words,
  confNum = { filter: isNumeric, max: 255, min: 0 },
  confStr = { filter: hasLiteral, comparer: STR_ASC }
) => {
  let a, b
  words = mapper(words, v => {
    if (confNum.filter(v)) {
      if (v >= (a ?? v)) { return a = v }
      else if (v <= (b ?? v)) { return b = v }
    }
    if (confStr.filter(v)) {
      return stringValueGamma(v)
    }
    return NaN
  })
  return words
}

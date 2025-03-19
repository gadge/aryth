import { STR_ASC }     from '@aryth/comparer'
import { hasLiteral }  from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { mapper }      from '@vect/vector-mapper'
import { stringValue } from '../../stringValue.js'

export const rankLiteralBig = (
  words,
  confNum = { by: isNumeric, max: 255, min: 0 },
  confStr = { by: hasLiteral, comparer: STR_ASC }
) => {
  return mapper(words, v => {
    if (confNum.by(v)) { return v }
    if (confStr.by(v)) { return { value: stringValue(v) } }
    return NaN
  })
}

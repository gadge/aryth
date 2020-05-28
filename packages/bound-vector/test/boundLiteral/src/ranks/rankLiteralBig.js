import { STR_ASC }     from '@aryth/comparer'
import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { mapper }      from '@vect/vector-mapper'
import { stringValue } from '../../stringValue'

export const rankLiteralBig = (
  words,
  confNum = { filter: isNumeric, max: 255, min: 0 },
  confStr = { filter: isLiteral, comparer: STR_ASC }
) => {
  return mapper(words, v => {
    if (confNum.filter(v)) { return v }
    if (confStr.filter(v)) { return { value: stringValue(v) } }
    return NaN
  })
}

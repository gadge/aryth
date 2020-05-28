import { STR_ASC }   from '@aryth/comparer'
import { Projector } from '@aryth/projector'
import { isLiteral } from '@typen/literal'
import { isNumeric } from '@typen/num-loose'
import { mapper }    from '@vect/vector-mapper'

export const rankLiteralCla = (
  words,
  confNum = { filter: isNumeric, max: 255, min: 0 },
  confStr = { filter: isLiteral, comparer: STR_ASC }
) => {
  let a, b
  const strings = []
  words = mapper(words, v => {
    if (confNum.filter(v)) if (v >= (a ?? v)) { return a = v }
    else if (v <= (b ?? v)) { return b = v }
    if (confStr.filter(v)) return strings.push(v), v
    return NaN
  })
  // ({ confNum, confStr, words, strings }) |> delogger
  const projector = Projector({ max: a, min: b }, { max: confNum.max, min: confNum.min })
  const restSorted = strings.sort(confStr.comparer)
  return mapper(words, x => {
    let i
    if (!isNaN(x)) {return projector(x)}
    if ((i = restSorted.indexOf(x)) >= 0) { return -(i + 1) }
    return x
  })
}

import { STR_ASC }             from '@aryth/comparer'
import { rank }                from '@aryth/rank-vector'
import { hasLiteral, isString } from '@typen/literal'
import { isNumeric }           from '@typen/num-loose'
import { mapper }              from '@vect/vector-mapper'

export const rankLiteralDev = (
  words,
  confNum = { filter: isNumeric, max: 255, min: 0 },
  confStr = { filter: hasLiteral, comparer: STR_ASC }
) => {
  let a, b
  const l = words.length
  let strings = undefined
  words = mapper(words, (v, i) => {
    if (confNum.filter(v)) {
      if (v >= (a ?? v)) { return a = v }
      else if (v <= (b ?? v)) { return b = v }
    }
    if (confStr.filter(v)) {
      if (!strings) strings = Array(l)
      strings[i] = v
      return undefined
    }
    return undefined
  })
  return {
    numbers: words,
    strings: strings ? rank(strings, STR_ASC, isString) : undefined
  }
}

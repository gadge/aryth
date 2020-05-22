import { isLiteral }   from '@typen/literal'
import { isNumeric }   from '@typen/num-loose'
import { iterate }     from '@vect/vector-mapper'
import { stringValue } from '../../../src/stringValue'

export const rankLiteralArc = (
  words,
  confNum = { filter: isNumeric },
  confStr = { filter: isLiteral }
) => {
  // let xa, xb, ya, yb, numbers, strings
  const n = { max: undefined, min: undefined, list: undefined }, s = { max: undefined, min: undefined, list: undefined }
  const l = words?.length
  iterate(
    words,
    (v, i) => {
      if (confNum.filter(v)) {
        if (!n.list) n.list = Array(l)
        if (v >= (n.max ?? v)) { n.max = v }
        else if (v <= (n.min ?? v)) { n.min = v }
        return n.list[i] = v
      }
      if (confStr.filter(v)) {
        if (!s.list) s.list = Array(l)
        if ((v = stringValue(v)) >= (s.max ?? v)) { s.max = v }
        else if (v <= (s.min ?? v)) { s.min = v }
        return s.list[i] = v//String(v)
      }
      return NaN
    },
    l
  )
  return [n, s]
  // return [{ max: xa, min: xb, list: numbers }, { max: ya, min: yb, list: strings }]
}

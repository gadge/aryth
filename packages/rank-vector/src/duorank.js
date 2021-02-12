import { NUM_ASC, STR_ASC } from '@aryth/comparer'
import { hasLiteral }       from '@typen/literal'
import { isNumeric }        from '@typen/num-loose'
import { iterate, mapper }  from '@vect/vector-mapper'

/**
 *
 * @param words
 * @param {Object|Function} x
 * @param {Object|Function} y
 * @return {number[]}
 */
export const duorank = (
  words,
  x = { filter: isNumeric, comparer: NUM_ASC },
  y = { filter: hasLiteral, comparer: STR_ASC }
) => {
  const primVec = [], restVec = []
  iterate(words, v => {
    if (x.filter(v)) return void primVec.push(v)
    if (y.filter(v)) return void restVec.push(v)
  })
  const
    primSorted = primVec.sort(x.comparer),
    restSorted = restVec.sort(y.comparer)
  return mapper(words, x => {
    let i
    if ((i = primSorted.indexOf(x)) >= 0) { return (i + 1) }
    if ((i = restSorted.indexOf(x)) >= 0) { return -(i + 1) }
    return NaN
  })
}

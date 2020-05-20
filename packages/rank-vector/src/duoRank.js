import { NUM_DESC, STR_DESC } from '@aryth/comparer'
import { isNumeric }          from '@typen/num-loose'
import { iterate, mapper }    from '@vect/vector-mapper'

const isAlphabetic = x => /[A-Za-z0-9]+/.test(x)

/**
 *
 * @param words
 * @param {Object} x
 * @param {Object} y
 * @return {number[]}
 */
export const duoRank = (
  words,
  x = { filter: isNumeric, comparer: NUM_DESC, },
  y = { filter: isAlphabetic, comparer: STR_DESC }
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

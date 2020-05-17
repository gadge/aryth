import { NUM_DESC, STR_DESC } from '@aryth/comparer'
import { isNumeric }          from '@typen/num-loose'
import { iterate, mapper }    from '@vect/vector-mapper'

const isAlphabetic = x => /[A-Za-z0-9]+/.test(x)

/**
 *
 * @param words
 * @param filter
 * @param comparer
 * @param restFilter
 * @param restComparer
 * @return {number[]}
 */
export const duoRank = (
  words,
  {
    filter = isNumeric,
    comparer = NUM_DESC,
  } = {},
  {
    filter: restFilter = isAlphabetic,
    comparer: restComparer = STR_DESC
  } = {}
) => {
  const primVec = [], restVec = []
  iterate(words, x => {
    if (filter(x)) return void primVec.push(x)
    if (restFilter(x)) return void restVec.push(x)
  })
  const
    primSorted = primVec.sort(comparer),
    restSorted = restVec.sort(restComparer)
  return mapper(words, x => {
    let i
    if ((i = primSorted.indexOf(x)) >= 0) { return -(i + 1) }
    if ((i = restSorted.indexOf(x)) >= 0) { return i + 1 }
    return NaN
  })
}
import { NUM_DESC, STR_DESC } from '@aryth/comparer'
import { makeEmbedded }       from '@foba/util'
import { says }               from '@palett/says'
import { decoCrostab }        from '@spare/logger'
import { LITERAL }            from '@spare/regex-phrasing'
import { ripper }             from '@spare/ripper'
import { isNumeric }          from '@typen/num-loose'
import { strategies }         from '@valjoux/strategies'
import { difference }         from '@vect/vector-algebra'
import { duorank }            from '../../src/duoRank'
import { rank }               from '../../src/rank'
import { candidates }         from './candidates'

const isAlphabetic = x => /[A-Za-z0-9]+/.test(x)

const config = {
  primFilter: isNumeric,
  restFilter: isAlphabetic,
  primComparer: NUM_DESC,
  restComparer: STR_DESC
}

export const duoRankClassic = (words, {
  primFilter = isNumeric,
  restFilter = x => /[A-Za-z0-9]+/.test(x),
  primComparer = NUM_DESC,
  restComparer = STR_DESC
} = {}) => {
  const primSorted = words.filter(primFilter).sort(primComparer)
  const restSorted = difference(words, primSorted).filter(restFilter).sort(restComparer)
  return words.map(x => {
    let i
    if ((i = primSorted.indexOf(x)) >= 0) { return -(i + 1) }
    if ((i = restSorted.indexOf(x)) >= 0) { return i }
    return NaN
  })
}
const rip = ripper.bind(LITERAL)
const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: candidates |> makeEmbedded,
  methods: {
    bench: phrase => rip(phrase,),
    classic: phrase => duoRankClassic(rip(phrase,), config),
    duoRank: phrase => duorank(rip(phrase)),
    numRank: phrase => rank(rip(phrase,), NUM_DESC, isNumeric),
    strRank: phrase => rank(rip(phrase,), STR_DESC, isAlphabetic)
  }
})

lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']


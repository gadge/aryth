import { NUM_ASC, NUM_DESC, STR_ASC } from '@aryth/comparer'
import { SimpleVectors }              from '@foba/foo'
import { says }              from '@palett/says'
import { DecoMatrix }        from '@spare/logger'
import { STR }               from '@typen/enum-data-types'
import { isNumeric } from '@typen/num-loose'
import { duorank }   from '../src/duoRank'
import { rank }      from '../src/rank'

const VectorCollection = SimpleVectors
VectorCollection.combined = ['foo', 'bar', 'zen', '-127', 0, 127]

const test = () => {
  for (const [key, vec] of Object.entries(SimpleVectors)) {
    const strRanks = rank(vec, STR_ASC, x => typeof x === STR)
    const numRanks = rank(vec, NUM_ASC, isNumeric)
    const duoRanks = duorank(
      vec,
      { filter: isNumeric, comparer: NUM_ASC },
      { filter: x => typeof x === STR, comparer: STR_ASC }
    )
    const matrix = [
      vec,
      strRanks,
      numRanks,
      duoRanks,
    ]
    matrix |> DecoMatrix({ delim: ' | ' }) |> says[key]
  }
}

test()

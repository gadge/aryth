import { NUM_DESC, STR_ASC } from '@aryth/comparer'
import { SimpleVectors }     from '@foba/foo'
import { says }              from '@palett/says'
import { DecoMatrix }        from '@spare/logger'
import { STR }               from '@typen/enum-data-types'
import { isNumeric }         from '@typen/num-loose'
import { rank }              from '../src/rank'

const test = () => {
  for (const [key, vec] of Object.entries(SimpleVectors)) {
    const strRanks = rank(vec, STR_ASC, x => typeof x === STR)
    const numRanks = rank(vec, NUM_DESC, isNumeric)
    const matrix = [
      vec,
      strRanks,
      numRanks,
    ]
    matrix |> DecoMatrix({ delim: ' | ' }) |> says[key]
  }
}

test()

import { NUM_ASC, STR_ASC }    from '@aryth/comparer'
import { SimpleVectors }       from '@foba/foo'
import { says }                from '@palett/says'
import { DecoMatrix }          from '@spare/logger'
import { isLiteral, isString } from '@typen/literal'
import { isNumeric }           from '@typen/num-loose'
import { duorank }             from '../src/duorank'
import { rank }                from '../src/rank'

const VectorCollection = SimpleVectors
VectorCollection.combined = ['foo', 'bar', 'zen', '-127', 0, 127]
VectorCollection.countries = ['GBR', 'KOR', 'JPN', 'IND', 'DEU', 'CHN', 'USA']
VectorCollection.cities = ['Erbil', 'Abuja', 'Cochabamba', 'Cochin', 'Stockton,Ranchi', 'Kathmandu', 'Madras', 'Ndjamena']

const test = () => {
  for (const [key, vec] of Object.entries(SimpleVectors)) {
    const strRanks = rank(vec, STR_ASC, isString)
    const numRanks = rank(vec, NUM_ASC, isNumeric)
    const duoRanks = duorank(
      vec,
      { filter: isNumeric, comparer: NUM_ASC },
      { filter: isLiteral, comparer: STR_ASC }
    )
    const matrix = [
      vec,
      // strRanks,
      // numRanks,
      duoRanks,
    ]
    matrix |> DecoMatrix({ delim: ' | ' }) |> says[key]
  }
}

test()

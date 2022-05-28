import { NUM_ASC, STR_ASC }     from '@aryth/comparer'
import { SimpleVectorCollection }        from '@foba/foo'
import { says }                 from '@palett/says'
import { DecoMatrix }           from '@spare/logger'
import { hasLiteral, isString } from '@typen/literal'
import { isNumeric }            from '@typen/num-loose'
import { duorank }              from '../src/duorank'
import { rank }                 from '../src/rank'

const VectorCollection = SimpleVectorCollection
VectorCollection.combined = ['foo', 'bar', 'zen', '-127', 0, 127]
VectorCollection.countries = ['GBR', 'KOR', 'JPN', 'IND', 'DEU', 'CHN', 'USA']
VectorCollection.cities = ['Erbil', 'Abuja', 'Cochabamba', 'Cochin', 'Stockton,Ranchi', 'Kathmandu', 'Madras', 'Ndjamena']

const test = () => {
  for (const [key, vec] of Object.entries(SimpleVectorCollection)) {
    const strRanks = rank(vec, STR_ASC, isString)
    const numRanks = rank(vec, NUM_ASC, isNumeric)
    const duoRanks = duorank(
      vec,
      { by: isNumeric, comparer: NUM_ASC },
      { by: hasLiteral, comparer: STR_ASC }
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

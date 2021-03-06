import { STR_ASC }          from '@aryth/comparer'
import { SimpleVectors }    from '@foba/foo'
import { says }             from '@palett/says'
import { DecoMatrix }       from '@spare/logger'
import { isLiteral }        from '@typen/literal'
import { isNumeric }        from '@typen/num-loose'
import { boundLiteral }     from '@aryth/bound-vector/boundLiteral/src/boundLiteral'
import { VectorCollection } from '@aryth/bound-vector/boundLiteral/candidates'

const test = () => {
  for (const [key, vec] of Object.entries(VectorCollection)) {
    const literalRanks = rankLiteral(
      vec,
      { filter: isNumeric, max: 255, min: 0 },
      { filter: isLiteral, comparer: STR_ASC }
    )
    const matrix = [
      vec,
      // strRanks,
      // numRanks,
      literalRanks,
    ]
    matrix |> DecoMatrix({ delim: ' | ' }) |> says[key]
  }
}

test()

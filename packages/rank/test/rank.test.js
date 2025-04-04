import { SimpleVectors }    from '@foba/foo'

import { NUM_ASC, STR_ASC } from '../../../temp/temp/src.js'
import { rank }             from '../src/rank.js'

export class RankTest {
  static test () {
    for (const [key, arr] of Object.entries(SimpleVectors)) {
      key |> logger
      const comparer = (arr.every(x => typeof x === 'string')) ? STR_ASC : NUM_ASC
      const ranks = rank(arr, comparer, x => typeof x === 'string')
      arr.map((x, i) => [x, ranks[i]])|> delogger
    }
  }
}

RankTest.test()

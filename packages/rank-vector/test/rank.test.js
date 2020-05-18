<<<<<<< HEAD
import { NUM_ASC, STR_ASC } from '@aryth/comparer'
import { simpleVectors }    from '@foba/foo'
import { delogger }         from '@spare/deco'
import { logger }           from '@spare/logger'
import { STR }              from '@typen/enum-data-types'
import { rank }             from '../src/rank'

const SimpleVectors = simpleVectors({ h: 5 })
SimpleVectors.another = ['a', 'b', 'c', ' ']

export class RankTest {
  static test () {
    for (const [key, arr] of Object.entries(SimpleVectors)) {
      key |> logger
      const comparer = (arr.every(x => typeof x === STR)) ? STR_ASC : NUM_ASC
      const ranks = rank(
        arr,
        comparer,
        x => typeof x === STR && x.trim().length > 0
      )
      arr.map((x, i) => [x, ranks[i]])|> delogger
=======
import { NUM_DESC, STR_ASC } from '@aryth/comparer'
import { SimpleVectors }     from '@foba/foo'
import { says }              from '@palett/says'
import { DecoMatrix }        from '@spare/logger'
import { STR }               from '@typen/enum-data-types'
import { isNumeric }         from '@typen/num-loose'
import { rank }              from '../src/rank'

export class RankTest {
  static test () {
    for (const [key, vec] of Object.entries(SimpleVectors)) {
      const strRanks = rank(vec, STR_ASC, x => typeof x === STR)
      const numRanks = rank(vec, NUM_DESC, isNumeric)
      const matrix = [
        vec,
        strRanks,
        numRanks,
      ]
      matrix |> DecoMatrix({ delim: ' | ' }) |> says[key]
>>>>>>> refs/remotes/origin/master
    }
  }
}

RankTest.test()

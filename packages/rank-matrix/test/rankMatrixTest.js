import { SimpleMatrices } from '@foba/foo'
import { logger } from 'xbrief'
import { rank } from '../src/rank'
import { NUM_DESC } from '@aryth/rank'
import { delogger } from '@spare/deco'

SimpleMatrices |> delogger

export class RankMatrixTest {
  static test () {
    for (const [key, mx] of Object.entries(SimpleMatrices)) {
      key |> logger
      rank(mx, NUM_DESC)|> delogger
    }
  }
}

RankMatrixTest.test()

import { SimpleMatrixCollection } from '@foba/foo'
import { logger }                 from 'xbrief'
import { rank }                   from '../src/rank'
import { NUM_DESC }               from '@aryth/rank'
import { delogger }               from '@spare/deco'

SimpleMatrixCollection |> delogger

export class RankMatrixTest {
  static test() {
    for (const [key, mx] of Object.entries(SimpleMatrixCollection)) {
      key |> logger
      rank(mx, NUM_DESC)|> delogger
    }
  }
}

RankMatrixTest.test()

import { NUM_DESC }               from '@aryth/rank'
import { SimpleMatrixCollection } from '@foba/foo'
import { delogger }               from '@spare/deco'

import { rank }                   from '../src/rank'

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

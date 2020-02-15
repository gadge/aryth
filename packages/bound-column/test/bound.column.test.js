import { logger } from '@spare/logger'
import { delogger } from '@spare/deco'
import { NUM_LEVEL_LOOSE, NUM_LEVEL_STRICT } from '@aryth/util-bound'
import { bound } from '../src/bound'

const paramsList = {
  row: [[5, 7, 9, 10, 6]],
  column: [[5], [7], [9], [10], [6]],
  simple: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  tx_mx: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
  w_NaN: [[NaN, NaN, NaN], [4, NaN, 6], [7, 8, 9]],
  empty: [],
  empty2: [[]],
}

for
  (const [key, mx] of Object.entries(paramsList)) {
  key |> logger
  bound(mx, 0, { dif: false, level: NUM_LEVEL_LOOSE }) |> delogger
}

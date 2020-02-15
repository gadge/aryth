import { logger } from '@spare/logger'
import { delogger } from '@spare/deco'
import { NUM_LEVEL_LOOSE, NUM_LEVEL_STRICT } from '@aryth/util-bound'
import { bound } from '../src/bound'

const paramsList = {
  one_zero: [0],
  one_nan: [NaN],
  asc_6: [0, 1, 2, 3, 4, 5],
  desc_6: [5, 4, 3, 2, 1, 0],
  misc: [false, 101, 102, 103, 104],
  misc2: [1, 2, NaN, 4, 5],
  tx_nums: ['244', '200', '306', '400', '150', '220', '190', '495'],
}

for (const [key, arr] of Object.entries(paramsList)) {
  key |> logger
  bound(arr, { dif: true, level: NUM_LEVEL_LOOSE }) |> delogger
}

import { logger } from '@spare/logger'
import { delogger } from '@spare/deco'
import { NUM_DESC } from '@aryth/comparer'
import { ColumnRank } from '../src/ColumnRank'
import { mapper } from '@vect/matrix-mapper'

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
  (let [key, mx] of Object.entries(paramsList)) {
  mx = mapper(mx, x => x)
  key |> logger
  ColumnRank(0, { isomorph: true, mutate: true })(mx, NUM_DESC) |> delogger
  ColumnRank(1, { isomorph: true, mutate: true })(mx, NUM_DESC) |> delogger
  ColumnRank(2, { isomorph: true, mutate: true })(mx, NUM_DESC) |> delogger
}

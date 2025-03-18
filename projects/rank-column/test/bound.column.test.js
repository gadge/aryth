import { NUM_DESC }    from '@aryth/comparer'
import { says }        from '@palett/says'
import { deco, }       from '@spare/deco'
import { decoMatrix, } from '@spare/logger'
import { mapper }     from '@vect/matrix-mapper'
import { ColumnRank } from '../src/ColumnRank.js'

const paramsList = {
  row: [[5, 7, 9, 10, 6]],
  column: [[5], [7], [9], [10], [6]],
  simple: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  tx_mx: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']],
  w_NaN: [[NaN, NaN, NaN], [4, NaN, 6], [7, 8, 9]],
  empty: [],
  empty2: [[]],
}

for (let [key, mx] of Object.entries(paramsList)) {
  mx = mapper(mx, x => x)
  mx |> decoMatrix |> says[key]
  ColumnRank(0, { isomorph: true, mutate: true })(mx, NUM_DESC) |> deco |> says[key].br('col 0')
  ColumnRank(1, { isomorph: true, mutate: true })(mx, NUM_DESC) |> deco |> says[key].br('col 1')
  ColumnRank(2, { isomorph: true, mutate: true })(mx, NUM_DESC) |> deco |> says[key].br('col 2')
}

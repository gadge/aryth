import { says }  from '@palett/says'
import { deco }  from '@spare/deco'
import { LOOSE } from '@typen/enum-check-levels'
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

for (const [key, mx] of Object.entries(paramsList)) {
  bound.call({ level: LOOSE }, mx, 0) |> deco |> says[key]
}

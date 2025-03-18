import { says }       from '@palett/says'
import { deco }       from '@spare/deco'

import { boundaries } from '../src/boundaries.js'

const paramsList = {
  row: [[5, 7, 9, 10, 6]],
  column: [[5], [7], [9], [10], [6]],
  simple: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  tx_mx: [['1', '2', '3,125'], ['4', '5', '6,580'], ['7', '8', '9,742']],
  han_mx: [['1', '过', '3'], ['4', '接', '6'], ['7', '8', '风']],
  w_NaN: [[NaN, NaN, NaN], [4, NaN, 6], [7, 8, 9]],
  empty: [],
  empty2: [[]],
}

for (const [key, mx] of Object.entries(paramsList)) {
  const db = boundaries(mx, [{}, {}])
  // db |> logger
  db|> deco |> says[key].br('vec')
  let max, min;
  ({ max, min } = db[0] ?? {});
  ({ max, min }) |> deco |> says[key].br('x');
  ({ max, min } = db[1] ?? {});
  ({ max, min }) |> deco |> says[key].br('y')
}

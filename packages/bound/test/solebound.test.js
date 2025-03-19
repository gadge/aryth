import { says }      from '@palett/says'
import { deco }      from '@spare/deco'
import { solebound } from '../utils/solebound.js'

const paramsList = {
  empty: [],
  one_zero: [0],
  one_nan: [NaN],
  asc_6: [0, 1, 2, 3, 4, 5],
  desc_6: [5, 4, 3, 2, 1, 0],
  misc: [false, 101, 102, 103, 104],
  misc2: [1, 2, NaN, 4, 5],
  tx_nums: ['244', '200', '306', '400', '150', '220', '190', '495'],
  tx_strs: 'comprehend how it\'s driven by animal spirits'.split(' '),
  tx_padded: ['  8', ' 64', '128', '1024', 'digits', ''],
}

for (const [key, arr] of Object.entries(paramsList)) {
  const vec = solebound(arr)
  vec |> deco |> says[key].br('vec')
  let max, min;
  ({ max, min } = vec ?? {});
  ({ max, min }) |> deco |> says[key].br('x')
}
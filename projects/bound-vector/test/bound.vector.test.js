import { says }  from '@palett/says'
import { deco }  from '@spare/deco'
import { bound } from '../src/bound.js'

const paramsList = {
  one_zero: [0],
  one_nan: [NaN],
  asc_6: [0, 1, 2, 3, 4, 5],
  desc_6: [5, 4, 3, 2, 1, 0],
  misc: [false, 101, 102, 103, 104],
  misc2: [1, 2, NaN, 4, 5],
  tx_nums: ['244', '200', '306', '400', '150', '220', '190', '495'],
  tx_strs: 'comprehend how it\'s driven by animal spirits'.split(' '),
}

for (const [key, arr] of Object.entries(paramsList)) {
  bound(arr) |> deco |> says[key]
}

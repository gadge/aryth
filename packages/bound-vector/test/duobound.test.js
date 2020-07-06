import { says }     from '@palett/says'
import { deco }     from '@spare/deco'
import { duobound } from '../src/duobound'

const paramsList = {
  empty: [],
  one_zero: [0],
  one_nan: [NaN],
  asc_6: [0, 1, 2, 3, 4, 5],
  desc_6: [5, 4, 3, 2, 1, 0],
  misc: [false, 101, 102, 103, 104],
  misc2: [1, 2, NaN, 4, 5],
  tx_nums: ['244', '200', '306', '400', '150', '220', '190', '495'],
}

for (const [key, arr] of Object.entries(paramsList)) {
  const vec = duobound(arr)
  vec |> deco |> says[key].br('vec')
  let max, min;
  ({ max, min } = vec[0] ?? {});
  ({ max, min }) |> deco |> says[key].br('x');
  ({ max, min } = vec[1] ?? {});
  ({ max, min }) |> deco |> says[key].br('y')
}

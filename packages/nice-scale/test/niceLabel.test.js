import { intExpon }   from '@aryth/math'
import { deco }       from '@spare/deco'
import { logger, xr } from '@spare/logger'
import { niceScale }  from '../src/niceScale'

const candidates = [
  { min: -0.05, max: +0.15 },
  { min: 0, max: 1 },
  { min: 0, max: 10 },
  { min: 3.14, max: 9.99 },
  { min: -3.14, max: 12 },
  { min: 13.14, max: 79.9 },
  { min: 14024, max: 17756 },
  { min: 13299, max: 13304 },
]

for (let { min, max } of candidates) {
  const expon = intExpon(min)
  let n = min / ( 10 ** expon )
  n = ~~( n * 10 ) * ( 10 ** ( expon - 1 ) )
  xr()
    .input(deco({ min, max }))
    .niceScale(deco(niceScale.call({ ticks: 6 }, { min, max })))
    .n(n)
    |> logger
}

import { deco, delogger } from '@spare/deco'
import { logger }         from '@spare/logger'
import { niceScale }      from '../src/niceScale'

const candidates = [
  { min: -0.05, max: +0.15 },
  { min: 0, max: 1 },
  { min: 0, max: 10 },
  { min: 3.14, max: 9.99 },
  { min: -3.14, max: 12 },
  { min: 13.14, max: 79.9 },
  { min: 14024, max: 17756 },
]

for (let candidate of candidates) {
  candidate |> deco |> logger
  niceScale(candidate) |> delogger
}

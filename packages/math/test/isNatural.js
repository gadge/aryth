import { logger } from '@spare/logger'
import { Xr }     from '@spare/xr'

const candidates = [
  -3, -2, -1, 0, 1, 2, 3
]

const notMinusOne = x => !!~x

for (let n of candidates) {
  logger(Xr().number(n).notMinusOne(notMinusOne(n)))
}
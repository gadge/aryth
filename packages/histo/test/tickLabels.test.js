import { ticksByMean } from '../src/utils/ticksByMean'
import { deco } from '@spare/deco'
import { says } from '@palett/says'
import { DecoVector, logger, xr } from '@spare/logger'

const alpha = () => {
  const ve = [1, 2, 3, 4, 8, 15, 16, 17]
  for (let number of ve) {
    xr().number(number).result((number >> 1) + 1).result((number + 1) >> 1)|> logger
  }
}

const candidates = [
  [50, 10, 1],
  [50, 10, 2],
  [36000, 12000, 5],
  [36000, 12000, 6],
  [36000, 12000, 7],
  [50, 10, 8],
]

for (let [mean, stdev, groups] of candidates) {
  ticksByMean(mean, stdev, groups)
    |> DecoVector({ indexed: true })
    |> says['ticks by mean'].p(({ mean, stdev, groups }) |> deco)
}

alpha()


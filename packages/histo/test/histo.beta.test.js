import { delogger, logger, Xr } from '@spare/logger'
import { Histo } from '../src/Histo'

const histo =  Histo.buildByMean(50, 10, 10)
histo.intervals() |> delogger

histo.ticks |> delogger
for (let i = -18; i <= 112; i += 10) {
  Xr(i) |> logger
  histo.collect(i)
}
histo.statistics() |> delogger

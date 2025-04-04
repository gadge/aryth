import { delogger, logger, Xr } from '@spare/logger'
import { NUM }                  from '@typen/enum-data-types'
import { Histo }                from '../src/Histo.js'

const histo = Histo.buildByMean(50, 10, 10)
histo.intervals() |> delogger

histo.ticks |> delogger
for (let i = -18; i <= 112; i += 10) {
  Xr(i) |> logger
  histo.collect(i)
}
histo.statistics({ keyType: NUM, objectify: true }) |> delogger

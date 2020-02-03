import { decoLog, logger, Xr } from 'xbrief'
import { Histo } from '../src/histo'

class HistoTest {
  static test () {
    const histo = new Histo(50, 10, 10)
    histo.intervals() |> decoLog

    histo.cuts |> decoLog
    for (let i = -18; i <= 112; i += 10) {
      Xr(i) |> logger
      histo.collect(i)
    }
    histo.statistics() |> decoLog
  }
}

HistoTest.test()

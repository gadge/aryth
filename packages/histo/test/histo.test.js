import { Ziggurat } from 'roulett'
import { decoLog } from 'xbrief'
import { Histo } from '../src/histo'

class HistoTest {
  static test () {
    const fallout = new Histo(36000, 12000, 7)
    fallout.cuts |> decoLog
    const zigg = new Ziggurat(36000, 12000)
    for (let i = 0; i < 4096; i++) {
      fallout.collect(zigg.next())
    }
    fallout.statistics() |> decoLog
  }
}

HistoTest.test()

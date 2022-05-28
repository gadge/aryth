import { Ziggurat }                   from '@aryth/rand'
import { decoObject, delogger, says } from '@spare/logger'
import { Histo }                      from '../src/Histo'

const zigg = new Ziggurat(36000, 12000)
const histo = Histo.buildByMean(36000, 12000, 7)
histo.ticks |> delogger

for (let i = 0; i < 4096; i++) {
  histo.collect(zigg.next())
}

histo.statistics() |> decoObject |> says['statistics'].p(histo.count)



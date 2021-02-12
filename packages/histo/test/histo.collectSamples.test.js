import { deco }     from '@spare/deco'
import { says }     from '@spare/logger'
import { init }     from '@vect/vector-init'
import { Ziggurat } from 'roulett'
import { Histo }    from '../src/Histo'

const zigg = new Ziggurat(75, 12)
const samples = init(1024, zigg.next.bind(zigg))

const histo = Histo.fromSamples(samples, 8)

histo.statistics() |> deco |> says['statistics'].br(histo.count)



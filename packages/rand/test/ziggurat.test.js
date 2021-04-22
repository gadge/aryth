import { Histo }              from '@aryth/histo'
import { decoObject, logger } from '@spare/logger'
import { Ziggurat }           from '../src/ziggurat'

const zig = Ziggurat.build(0, 10)
const vec = []
for (let i = 0; i < 200; i++) vec.push(zig.nextInt())
const histo = Histo.fromSamples(vec)
histo.statistics() |> decoObject |> logger
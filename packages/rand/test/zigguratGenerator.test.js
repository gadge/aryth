import { Histo }              from '@aryth/histo'
import { deco }               from '@spare/deco'
import { decoObject, logger } from '@spare/logger'
import { ziggurat }           from '../src/zigguratGenerator'

const zig = ziggurat(0, 10, 0)
const vec = []
for (let i = 0; i < 10; i++) {
  const norm = zig.next()
  norm |> deco |> logger
  vec.push(norm.value)
}

const histo = Histo.fromSamples(vec)
histo.statistics() |> decoObject |> logger
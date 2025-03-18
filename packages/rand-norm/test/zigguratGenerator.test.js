import { Histo }              from '@aryth/histo'
import { decoObject, logger } from '@spare/logger'
import { test } from 'node:test'
import { norm } from '../src/normDist/generator.js'

const zig = norm(0, 10, 0)
const vec = []
for (let i = 0; i < 300; i++) {
  const norm = zig.next()
  // logger(deco(norm))
  vec.push(norm.value)
}

test('ziggurat', () => {
  const histo = Histo.fromSamples(vec)
  logger(decoObject(histo.statistics()))
})
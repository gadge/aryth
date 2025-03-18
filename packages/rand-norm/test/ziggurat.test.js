import { Histo }                from '@aryth/histo'
import { decoObject, logger }   from '@spare/logger'
import { test }                 from 'node:test'
import { Norm }                 from '../src/normDist/Norm.js'
import { distributionDemoTape } from './renderer/distributionDemoTape.js'

console.time('Norm build')
const gen = Norm.build()
console.timeEnd('Norm build')

// const vec = []
// for (let i = 0; i < 300; i++) vec.push(zig.next())
const numbers = Array.from({ length: 100000 }, gen.next.bind(gen))
const histo = Histo.fromSamples(numbers)

test('ziggurat', () => {
  logger(decoObject(histo.statistics()))
  distributionDemoTape(numbers, 0.2)
})

import { Histo }              from '@aryth/histo'
import { decoObject, logger } from '@spare/logger'
import { test }               from 'node:test'
import { n, Walk }            from '../index.js'
import { Norm }               from '../src/Norm.js'
import { demoTape }           from './renderer/demoTape.js'

console.time('Norm build')
// const gen = Norm.build()
console.timeEnd('Norm build')

// const vec = []
// for (let i = 0; i < 300; i++) vec.push(zig.next())
const samples = Array.from({ length: 100000 }, n) // gen.next.bind(gen))
const histo = Histo.fromSamples(samples)

test('ziggurat', () => {
  logger(decoObject(histo.statistics()))
  demoTape(samples, 0.2)
})

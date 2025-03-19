import { Foba }                          from '@foba/vector-number'
import { deco }                          from '@spare/deco'
import { decoEntries, decoMatrix, says } from '@spare/logger'
import { test }                          from 'node:test'
import { Distinct, DistinctCount }       from '../src/index.js'

const matrix = [
  Foba.range(8),
  Foba.range(8),
  Foba.range(8),
  Foba.range(8),
  Foba.fibonacci(8),
  Foba.fibonacci(8),
  Foba.fibonacci(8),
  Foba.nonSquares(8),
  Foba.nonSquares(8),
]

test('distinct column', () => {
  says['original'](decoMatrix(matrix))
  says['distincted'](deco(Distinct(6)(matrix)))
  says['counted'](decoEntries(DistinctCount(6)(matrix)))
})


import { Foba } from '@foba/vector-number'
import { decoEntries, decoMatrix, says } from '@spare/logger'
import { Distinct, DistinctCount } from '../src'
import { deco } from '@spare/deco'

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

matrix |> decoMatrix |> says['original']
Distinct(6)(matrix) |> deco |> says['distincted']
DistinctCount(6)(matrix) |> decoEntries |> says['counted']

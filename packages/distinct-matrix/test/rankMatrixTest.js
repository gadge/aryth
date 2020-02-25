import { SimpleMatrices } from '@foba/foo'
import { decoEntries, decoMatrix, decoVector, says } from '@spare/logger'
import { distinct, distinctCount } from '../src'

const matrices = SimpleMatrices
for (const [key, matrix] of Object.entries(matrices)) {
  matrix |> decoMatrix |> says[key + ' original']
  matrix |> distinct |> decoVector |> says[key + ' distinct']
  matrix |> distinctCount |> decoEntries |> says[key + ' count']
}

import { SimpleMatrixCollection }                    from '@foba/foo'
import { decoEntries, decoMatrix, decoVector, says } from '@spare/logger'
import { distinct, distinctCount }                   from '../src/index.js'

const matrices = SimpleMatrixCollection
for (const [key, matrix] of Object.entries(matrices)) if (matrix?.length && matrix[0]?.length) {
  matrix |> decoMatrix |> says[key + ' original']
  matrix |> distinct |> decoVector |> says[key + ' distinct']
  matrix |> distinctCount |> decoEntries |> says[key + ' petals']
}

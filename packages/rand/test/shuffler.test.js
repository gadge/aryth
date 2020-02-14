import { SimpleVectors } from '@foba/foo'
import { shuffle } from '../src/rand'
import { deco, decoLog, logger } from 'xbrief'

SimpleVectors |> decoLog
for (const [key, value] of Object.entries(SimpleVectors).reverse()) {
  key |> logger
  shuffle(value, 4) |> deco |> logger
  // value |> Shuffler(4) |> logger
}

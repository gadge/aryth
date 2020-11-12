import { flopGenerator } from '../src/flopGenerator'
import { Foba } from '@foba/vector-number'
import { deco } from '@spare/deco'
import { logger } from '@spare/logger'

const arr = Foba.range(5)
const fg = flopGenerator(arr, -1)
for (let i = 0; i < 10; i++) {
  fg.next() |> deco |> logger
}

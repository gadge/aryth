import { Foba }          from '@foba/vector-number'
import { deco }          from '@spare/deco'
import { logger }  from '@spare/logger'
import { flopper } from '../src/flopper.js'

const arr = Foba.range(5)
const fg = flopper(arr, -1)
for (let i = 0; i < 10; i++) {
  fg.next() |> deco |> logger
}

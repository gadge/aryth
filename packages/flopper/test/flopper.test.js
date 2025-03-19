import { VectorCollection } from '@foba/vector-number'
import { deco }             from '@spare/deco'
import { logger }           from '@spare/logger'
import { finiteFlopper }    from '../src/flopper.js'

console.log('alpha')
{
  const arr = VectorCollection.range(5)
  const fg = finiteFlopper(arr, -1)
  for (let i = 0; i < 10; i++) {
    fg.next() |> deco |> logger
  }
}

console.log('')
console.log('beta')
{
  const arr = VectorCollection.range(5)
  const fg = finiteFlopper(arr, -1)
  for (let el of fg) {
    el |> deco |> logger
  }
}

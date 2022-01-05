import { Foba }          from '@foba/vector-number'
import { deco }          from '@spare/deco'
import { logger }        from '@spare/logger'
import { finiteFlopper } from '../src/flopper'

console.log('alpha')
{
  const arr = Foba.range(5)
  const fg = finiteFlopper(arr, -1)
  for (let i = 0; i < 10; i++) {
    fg.next() |> deco |> logger
  }
}

console.log('')
console.log('beta')
{
  const arr = Foba.range(5)
  const fg = finiteFlopper(arr, -1)
  for (let el of fg) {
    el |> deco |> logger
  }
}

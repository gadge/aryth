import { product }     from '@vect/matrix'
import { decoCrostab } from '@spare/logger'
import { says }        from '@spare/xr'

const candidates = [
  undefined,
  null,
  0,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  NaN
]

const matrix = product(candidates, candidates, (x, y) => x > y)
const crostab = {
  side: candidates,
  head: candidates,
  rows: matrix,
}

crostab |> decoCrostab |> says['compare'].p('side > head')
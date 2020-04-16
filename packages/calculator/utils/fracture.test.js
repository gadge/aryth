import { says }               from '@palett/says'
import { deco }               from '@spare/deco'
import { xr }                 from '@spare/logger'
import { expressionToVector } from './fracture'

const candidates = {
  standard: '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3',
  arithNeg: '5 + 4',
  combo: 'PI + abs(foo + 127)+ max(left, right)'
}

for (const [name, expression] of Object.entries(candidates)) {
  xr()['original'](expression)['fracture'](expression |> expressionToVector |> deco) |> says[name]
}

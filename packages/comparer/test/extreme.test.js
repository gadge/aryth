import { CrosTabX } from 'xbrief'
import { Chrono } from 'elprimero'
import { max } from '../src/extreme'

const { lapse, result } = Chrono.strategies({
  repeat: 1E+7,
  paramsList: {
    simple: [32, 255],
    misc: [-Math.PI, Math.E],
    another: [0, 0]
  },
  funcList: {
    bench: (a, b) => (a + b),
    native: Math.max,
    stable: max,
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log

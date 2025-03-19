import { abs }                       from '@aryth/math'
import { decoCrostab, logger, says } from '@spare/logger'
import { strategies }                from '@valjoux/strategies'
import { max }                       from '../src/extreme.js'

const { lapse, result } = strategies({
  repeat: 1E+7,
  candidates: {
    simple: [ 32, 255 ],
    misc: [ -Math.PI, Math.E ],
    another: [ 0, 0 ],
  },
  methods: {
    bench: (a, b) => (a + b),
    native: Math.max,
    stable: max,
    realMax: (a, b) => ((a + b + abs(a - b)) >> 1),
    realMin: (a, b) => ((a + b - abs(a - b)) >> 1),
  },
})

lapse |> decoCrostab |> says['lapse']
'' |> logger
result |> decoCrostab |> says['result']

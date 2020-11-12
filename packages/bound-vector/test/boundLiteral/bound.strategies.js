import { makeEmbedded }     from '@foba/util'
import { says }             from '@palett/says'
import { decoCrostab }      from '@spare/logger'
import { strategies }       from '@valjoux/strategies'
import { bounds, PRESETS }  from '../../src/bounds'
import { duobound }         from '../../src/duobound'
import { VectorCollection } from './candidates'
import { boundLiteralArc }  from './src/bounds/boundLiteralArc'
import { boundLiteralRea }  from './src/bounds/boundLiteralRea'
import { boundLiteralSep }  from './src/bounds/boundLiteralSep'

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: VectorCollection |> makeEmbedded,
  methods: {
    bench: x => x,
    rea: boundLiteralRea,
    arc: boundLiteralArc,
    duobound: duobound,
    bounds: x => bounds(x, PRESETS),
    sep: boundLiteralSep,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

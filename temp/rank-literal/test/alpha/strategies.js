import { duorank }          from '@aryth/rank-vector'
import { makeEmbedded }     from '@foba/util'
import { says }             from '@palett/says'
import { decoCrostab }      from '@spare/logger'
import { strategies }       from '@valjoux/strategies'
import { boundLiteral }     from '../../src/rankLiteral'
import { VectorCollection } from './candidates'
import { rankLiteralBig }   from './src/rankLiteralBig'
import { rankLiteralBuf }   from './src/rankLiteralBuf'
import { rankLiteralCla }   from './src/rankLiteralCla'
import { rankLiteralDev }   from './src/rankLiteralDev'
import { rankLiteralFut }   from './src/rankLiteralFut'

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: VectorCollection |> makeEmbedded,
  methods: {
    bench: x => x,
    arc: boundLiteral,
    big: rankLiteralBig,
    buf: rankLiteralBuf,
    cla: rankLiteralCla,
    dev: rankLiteralDev,
    fut: rankLiteralFut,
    edge: duorank,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']

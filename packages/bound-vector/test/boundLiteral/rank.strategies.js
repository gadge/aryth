import { duorank }          from '@aryth/rank-vector'
import { makeEmbedded }     from '@foba/util'
import { says }             from '@palett/says'
import { decoCrostab }      from '@spare/logger'
import { strategies }       from '@valjoux/strategies'
import { VectorCollection } from './candidates'
import { rankLiteralBig }   from './src/ranks/rankLiteralBig'
import { rankLiteralBuf }   from './src/ranks/rankLiteralBuf'
import { rankLiteralCla }   from './src/ranks/rankLiteralCla'
import { rankLiteralDev }   from './src/ranks/rankLiteralDev'
import { rankLiteralFut }   from './src/ranks/rankLiteralFut'

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: VectorCollection |> makeEmbedded,
  methods: {
    bench: x => x,
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

import { duorank }          from '@aryth/rank-vector'
import { makeEmbedded }     from '@foba/util'
import { says }             from '@palett/says'
import { decoCrostab }      from '@spare/logger'
import { strategies }       from '@valjoux/strategies'
import { VectorCollection } from './candidates'
import { boundLiteralArc }  from './src/boundLiteralArc'
import { boundLiteralRea }  from './src/boundLiteralRea'
import { boundLiteralSep }  from './src/boundLiteralSep'
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
    rea: boundLiteralRea,
    arc: boundLiteralArc,
    sep: boundLiteralSep,
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

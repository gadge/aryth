import { makeEmbedded }              from '@foba/util'
import { decoCrostab, logger, says } from '@spare/logger'
import { strategies }                from '@valjoux/strategies'
import { dateTime }                  from '@valjoux/timestamp-pretty'
import { samples }                   from './samples.js'
import { romanArc }                  from './src/romanArc.js'
import { romanDev }                  from './src/romanDev.js'
import { romanRec }                  from './src/romanRec.js'
import { romanRev }                  from './src/romanRev.js'

const test = () => {
  const { lapse, result } = strategies({
    repeat: 1E+5,
    candidates: samples |> makeEmbedded,
    methods: {
      romanArc,
      romanDev,
      romanRec,
      romanRev,
    }
  })
  lapse |> decoCrostab |> says['lapse'].p(dateTime())
  '' |> logger
  result |> decoCrostab |> says['result'].p(dateTime())
}
test()
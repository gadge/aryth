import { makeEmbedded }              from '@foba/util'
import { decoCrostab, logger, says } from '@spare/logger'
import { strategies }                from '@valjoux/strategies'
import { dateTime }                  from '@valjoux/timestamp-pretty'
import { samples }                   from './samples'
import { romanArc }                  from './src/romanArc'
import { romanDev }                  from './src/romanDev'
import { romanRec }                  from './src/romanRec'
import { romanRev }                  from './src/romanRev'

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
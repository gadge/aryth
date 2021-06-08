import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { roundD2 }           from '../../index'
import { CANDIDATES }        from './CANDIDATES'
import { abbrMoh }           from './mohsenando'
import { abbrVinc }          from './vincent'
import { abbrYaron }         from './yaron'


const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: CANDIDATES |> makeEmbedded,
  methods: {
    bench: roundD2,
    moh: abbrMoh,
    yaron: abbrYaron,
    // harr: abbrHarr,
    andr: abbrVinc
  }
  // cla, dev, edg, rea, arc, epi
})

lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
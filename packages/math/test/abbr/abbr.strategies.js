import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'
import { roundD2 }           from '../../index.js'
import { CANDIDATES }        from './CANDIDATES.js'
import { abbrMoh }           from './mohsenando.js'
import { abbrVinc }          from './vincent.js'
import { abbrYaron }         from './yaron.js'


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
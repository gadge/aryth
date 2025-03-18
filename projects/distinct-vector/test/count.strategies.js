import { makeEmbedded }              from '@foba/util'
import { deco }                      from '@spare/deco'
import { decoCrostab, logger, says } from '@spare/logger'
import { strategies }     from '@valjoux/strategies'
import { distinctCount }  from '../src/index.js'
import { countByEntries } from '../src/functions/countByEntries.js'
import { countByObject }  from '../src/functions/countByObject.js'
import { candidates }     from './candidates.js'

export class CountStrategies {
  static testCount() {
    const { lapse, result } = strategies({
      repeat: 1E+4,
      candidates: candidates |> makeEmbedded,
      methods: {
        bench: ar => ar.map(x => [ x, 1 ]),
        official: distinctCount,
        entries: countByEntries,
        object: countByObject,
        map: arr => {
          const map = new Map()
          for (let i = 0, l = arr.length, x; i < l; i++)
            map.set(x = arr[i], (map.get(x) | 0) + 1)
          return Array.from(map.entries())
        },
      }
    })
    lapse |> decoCrostab |> says.lapse
    result |> decoCrostab |> says.result
    result.cell('S016', 'edge') |> deco |> logger
    result.cell('S016', 'entries') |> deco |> logger
    result.cell('S016', 'map') |> deco |> logger
  }
}

CountStrategies.testCount()

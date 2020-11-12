import { Chrono } from 'elprimero'
import { decoCrostab, logger, says } from '@spare/logger'
import { deco } from '@spare/deco'
import { candidates } from './candidates'
import { makeEmbedded } from '@foba/util'
import { countByEntries } from '../src/functions/countByEntries'
import { countByObject } from '../src/functions/countByObject'
import { distinctCount } from '../src'

export class CountStrategies {
  static testCount () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+4,
      paramsList: candidates |> makeEmbedded,
      funcList: {
        bench: ar => ar.map(x => [x, 1]),
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
    result.queryCell('S016', 'edge') |> deco |> logger
    result.queryCell('S016', 'entries') |> deco |> logger
    result.queryCell('S016', 'map') |> deco |> logger
  }
}

CountStrategies.testCount()

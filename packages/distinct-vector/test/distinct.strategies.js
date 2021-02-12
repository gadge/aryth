import { makeEmbedded }              from '@foba/util'
import { deco }                      from '@spare/deco'
import { decoCrostab, logger, says } from '@spare/logger'
import { Chrono }                    from 'elprimero'
import { distinct }                  from '../src'
import { distinctByArray }           from '../src/functions/distinctByArray'
import { distinctByObject }          from '../src/functions/distinctByObject'
import { candidates }                from './candidates'

export class DistinctStrategies {
  static testDistinct () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+4,
      paramsList: candidates |> makeEmbedded,
      funcList: {
        official: distinct,
        array: distinctByArray,
        object: distinctByObject,
        set: vec => Array.from(new Set(vec))
      }
    })
    lapse |> decoCrostab |> says.lapse
    result |> decoCrostab |> says.result
    result.queryCell('M016', 'array') |> deco |> logger
    result.queryCell('M016', 'set') |> deco |> logger
    result.queryCell('M016', 'object') |> deco |> logger
    result.queryCell('M016', 'edge') |> deco |> logger
  }
}

DistinctStrategies.testDistinct()

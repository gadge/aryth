import { VectorCollection } from '@foba/vector-number'
import { says }             from '@palett/says'
import { deco }             from '@spare/deco'
import { STRICT }           from '@typen/enum-check-levels'

const { Project } = require('..')

export const test = () => {
  for (const [key, Vec] of Object.entries(VectorCollection)) {
    const vec = Vec(5)
    vec |> deco |> says[key]
    Project({ level: STRICT, max: 255, min: 0 })(vec).map(x => x.toFixed(2)) |> deco |> says[key]
  }
}

test()

import { VectorCollection } from '@foba/vector-number'
import { says }             from '@palett/says'
import { deco }             from '@spare/deco'
import { project }          from '../src/project'

export const test = () => {
  for (const [ key, Vec ] of Object.entries(VectorCollection)) {
    const vec = Vec(5)
    vec |> deco |> says[key]
    project(vec, { max: 255, min: 0 }).map(x => x.toFixed(2)) |> deco |> says[key]
  }
}

test()

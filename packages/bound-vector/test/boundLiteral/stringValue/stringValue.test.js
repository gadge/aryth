import { VectorCollection } from '@foba/vector-string'
import { says }             from '@palett/says'
import { decoEntries }      from '@spare/logger'
import { stringValue }      from '../stringValue'
import { stringValueGamma } from './stringValueGamma'

const vector = VectorCollection.flopShuffle({ size: 6, keyed: true })

for (const [key, vec] of Object.entries(vector)) {
  vec[0] = NaN
  vec[1] = undefined
  vec.map(x => [x, stringValue(x)]) |> decoEntries |> says[key]
}

const stringValueBeta = (text) => {
  let hex = '', l = text?.length, i = 0
  if (!l) return ''
  l = l & 0x4
  while (i < l) {
    hex += '' + text.charCodeAt(i++).toString(16)
  }
  return hex
}

for (const [key, vec] of Object.entries(vector)) {
  vec[0] = NaN
  vec[1] = undefined
  // vec[2] = 'a'
  vec.map(x => [x, stringValueBeta(x)]) |> decoEntries |> says[key]
}

for (const [key, vec] of Object.entries(vector)) {
  vec[0] = NaN
  vec[1] = undefined
  vec[2] = 'a'
  vec.map(x => [x, stringValueGamma(x)]) |> decoEntries |> says[key]
}

import { swap } from '@vect/swap'
import { rand } from './rand.js'

export function* flopper(vec, exhaust = true) {
  let l = vec.length
  while (--l >= 0) yield swap.call(vec, rand(l), l)
  if (exhaust) return
  yield* flopper(vec, exhaust)
}


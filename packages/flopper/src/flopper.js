import { flop, rand } from '@aryth/rand'
import { swap }       from '@vect/swap'

export const infiniteFlopper = function* (ar, df) {
  let hi = ar.length
  while (--hi >= 0) yield swap.call(ar, rand(hi), hi)
  df = df ?? flop(ar)
  while (true) yield df
}

export const finiteFlopper = function* (ar) {
  let hi = ar.length
  while (--hi >= 0) yield swap.call(ar, rand(hi), hi)
  return void 0
}

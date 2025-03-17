import { swap } from '@vect/swap'
import { flop } from './flop.js'
import { rand } from './rand.js'

export const flopGenerator = function* (ar, df) {
  let l = ar.length
  while (--l >= 0) yield swap.call(ar, rand(l), l)
  df = df ?? (flop(ar))
  while (true) yield df
}


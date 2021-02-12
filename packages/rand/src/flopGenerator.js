import { swap } from '@vect/swap'
import { flop } from './flop'
import { rand } from './rand'

export const flopGenerator = function* (ar, df) {
  let l = ar.length
  while (--l >= 0) yield swap.call(ar, rand(l), l)
  df = df ?? (ar|> flop)
  while (true) yield df
}


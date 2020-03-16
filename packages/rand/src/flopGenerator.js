import { swap } from '@vect/swap'
import { rand } from './rand'
import { flop } from './flop'

export const flopGenerator = function * (ar, df) {
  let l = ar.length
  while (--l >= 0) yield swap.call(ar, rand(l), l)
  df = df ?? (ar|> flop)
  while (true) yield df
}

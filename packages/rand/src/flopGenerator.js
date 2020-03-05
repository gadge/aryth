import { rand } from './rand'
import { swap } from '../utils/swap'
import { flop } from './flop'

export const flopGenerator = function * (ar, df) {
  let l = ar.length
  for (--l; l >= 0; l--) yield swap.call(ar, rand(l), l)
  df = df ?? (ar|> flop)
  while (true) yield df
}

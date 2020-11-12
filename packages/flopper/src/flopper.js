import { flop, rand } from '@aryth/rand'
import { swap }       from '@vect/swap'

export const infiniteFlopper = function* (ar, df) {
  let l = ar.length
  while (--l >= 0) yield swap.call(ar, rand(l), l)
  df = df ?? (ar|> flop)
  while (true) yield df
}

export const finiteFlopper = function* (ar) {
  let l = ar.length
  while (--l >= 0) yield swap.call(ar, rand(l), l)
  return void 0
}

import {swap}       from '@vect/swap'
import {flop, rand} from '@aryth/rand'

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

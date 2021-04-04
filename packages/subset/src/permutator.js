import { swap } from '@vect/swap'
import { iso }  from '@vect/vector-init'

export function* permutator(vec) {
  let
    hi = vec.length,
    c = iso(hi, 0),
    lo = 1
  yield vec.slice()
  while (lo < hi) {
    if (c[lo] < lo) {
      swap.call(vec, lo, lo % 2 && c[lo])
      ++c[lo]
      lo = 1
      yield vec.slice()
    } else {
      c[lo] = 0
      ++lo
    }
  }
}

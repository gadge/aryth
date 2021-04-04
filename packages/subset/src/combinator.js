import { iso }    from '@vect/vector-init'
import { select } from '@vect/vector-select'

export function* combinator(vec, count = vec.length) {
  if (!vec?.length) vec = []
  if (!count) count = vec.length
  const indexes = iso(count, -1), hi = vec.length
  let lo = 0
  while (lo >= 0) {
    if (indexes[lo] + count < lo + hi) {
      for (let k = indexes[lo] - lo + 1; lo < count; lo++) indexes[lo] = k + lo
      yield select(vec, indexes, count)
    } else {
      lo--
    }
  }
}
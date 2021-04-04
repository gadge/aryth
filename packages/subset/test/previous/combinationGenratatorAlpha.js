import { iso, select } from '@vect/vector'

export function* combinationGenerator(vec, c) {
  if (!vec?.length) vec = []
  if (!c) c = vec.length
  const inds = iso(c, -1), hi = vec.length
  let lo = 0
  while (lo >= 0) {
    if (inds[lo] + c < lo + hi) {
      for (let k = inds[lo] - lo + 1; lo < c; lo++) inds[lo] = k + lo
      yield select(vec, inds, c)
    } else {
      lo--
    }
  }
}
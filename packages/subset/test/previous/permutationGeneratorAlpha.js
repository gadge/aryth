import { swap } from '@vect/swap'

export function* permutationGenerator(vec, lo = 0, hi = vec.length) {
  if (lo + 1 === hi) yield vec.slice()
  for (let i = lo; i < hi; i++) {
    swap.call(vec, lo, i)
    yield* permutationGenerator(vec, lo + 1, hi)
    swap.call(vec, lo, i)
  }
}

export function* permuteBefore(vec, pos = vec.length - 1) {
  if (pos === 0) yield vec.slice()
  for (let i = pos; i >= 0; i--) {
    swap.call(vec, pos, i)
    yield* permuteBefore(vec, pos - 1)
    swap.call(vec, pos, i)
  }
}
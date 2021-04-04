import { swap } from '@vect/swap'

export function* permute() {
  const { lo, hi, vec, swap } = this
  if (lo + 1 === hi) yield vec.slice()
  for (let i = lo; i < hi; i++) {
    swap(lo, i)
    this.lo = lo + 1
    yield* permute.call(this)
    swap(lo, i)
  }
}

export function PermutationGenerator(vec) {
  return permute.call({
    vec: vec,
    lo: 0,
    hi: vec.length,
    swap: swap.bind(vec),
  })
}

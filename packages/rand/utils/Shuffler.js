import { min } from '@aryth/comparer'
import { rand } from '../src/rand'

export function indexShuffler (ar) {
  let length = this.length || ar.length
  let size = min(length, this.size)
  const vec = Array(size)
  for (let i = 0, set = new Set(), rn; i < size; i++) {
    do { rn = length |> rand } while (set.has(rn))
    set.add(rn)
    vec[i] = rn
  }
  return vec
}

export const shuffler = function (ar) { return indexShuffler.call(this, ar).map(i => ar[i]) }

export const Shuffler = (size) => shuffler.bind({ size })

export const IndexShuffler = (size) => indexShuffler.bind({ size })

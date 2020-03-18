import { objectDistinctor } from '@aryth/util-distinct'
import { iterate } from '@vect/vector-mapper'

export const distinctByObject = (vec, l) => {
  const o = {}
  iterate(vec, objectDistinctor.bind(o), l)
  return Object.keys(o)
}

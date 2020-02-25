import { distinctorAr } from '@aryth/util-distinct'
import { iterate } from '@vect/vector-mapper'

export const distinctByArray = (vec, l) => {
  const dist = []
  iterate(vec, distinctorAr.bind(dist), l)
  return dist
}



import { vectorDistinctor } from 'projects/util-distinct'
import { iterate }          from '@vect/vector-mapper'

export const distinctByArray = (vec, l) => {
  const dist = []
  iterate(vec, vectorDistinctor.bind(dist), l)
  return dist
}



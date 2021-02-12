import { entriesCounter } from '@aryth/util-distinct'
import { iterate }        from '@vect/vector-mapper'

/**
 *
 * @param {*[]} vec
 * @param {number} l
 * @returns {[*,number][]}
 */
export const countByEntries = function (vec, l) {
  const ents = []
  iterate(vec, entriesCounter.bind(ents), l)
  return ents
}

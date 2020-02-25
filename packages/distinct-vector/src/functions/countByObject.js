import { counterOb } from '@aryth/util-distinct'
import { iterate } from '@vect/vector-mapper'

/**
 *
 * @param {*[]} vec
 * @param {number} l
 * @returns {[*,number][]}
 */
export const countByObject = (vec, l) => {
  const o = {}
  iterate(vec, counterOb.bind(o), l)
  return Object.entries(o)
}

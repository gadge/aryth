import { mapper } from '@vect/matrix-mapper'

/**
 *
 * @param {*[]} mx
 * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [by]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
export const rank = (mx, comparer, by) => {
  let flat = mx.flat(1)
  if (by) flat = flat.filter(by)
  flat = flat.sort(comparer)
  return mapper(mx, x => (x = flat.indexOf(x)) >= 0 ? x : NaN)
}


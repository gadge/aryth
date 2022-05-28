/**
 *
 * @param {*[]} vec
 * @param {function(*,*):number} [comparer] Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [by]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
export const rank = function (vec, comparer, by) {
  comparer = this?.comparer ?? comparer
  by = this?.by ?? by
  const sorted = (!by ? vec.slice() : vec.filter(filter)).sort(comparer)
  return vec.map(x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
}

export const Rank = (comparer, filter) => rank.bind({ comparer, filter })

/**
 *
 * @param {*[]} ar
 * @param {number[]} ranks array of the same length as 'arr', containing rank order of 'arr', 0 comes first.
 * @return {*[]}
 */
export const reorderBy = (ar, ranks) => {
  const ve = Array(ar.length)
  for (let [i, ord] of ranks.entries()) ve[ord] = ar[i]
  return ve
}


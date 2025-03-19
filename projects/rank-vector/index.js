import { NUM_ASC, STR_ASC } from '@aryth/comparer';
import { hasLiteral } from '@typen/literal';
import { isNumeric } from '@typen/num-loose';
import { iterate, mapper } from '@vect/vector-mapper';

/**
 *
 * @param {*[]} vec
 * @param {function(*,*):number} [comparer] Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [by]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
const rank = function (vec, comparer, by) {
  comparer = this?.comparer ?? comparer;
  by = this?.by ?? by;
  const sorted = (!by ? vec.slice() : vec.filter(filter)).sort(comparer);
  return vec.map(x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
};

const Rank = (comparer, filter) => rank.bind({ comparer, filter });

/**
 *
 * @param {*[]} ar
 * @param {number[]} ranks array of the same length as 'arr', containing rank order of 'arr', 0 comes first.
 * @return {*[]}
 */
const reorderBy = (ar, ranks) => {
  const ve = Array(ar.length);
  for (let [i, ord] of ranks.entries()) ve[ord] = ar[i];
  return ve
};

/**
 *
 * @param words
 * @param {Object|Function} x
 * @param {Object|Function} y
 * @return {number[]}
 */
const duorank = (
  words,
  x = { by: isNumeric, comparer: NUM_ASC },
  y = { by: hasLiteral, comparer: STR_ASC }
) => {
  const primVec = [], restVec = [];
  iterate(words, v => {
    if (x.by(v)) return void primVec.push(v)
    if (y.by(v)) return void restVec.push(v)
  });
  const
    primSorted = primVec.sort(x.comparer),
    restSorted = restVec.sort(y.comparer);
  return mapper(words, x => {
    let i;
    if ((i = primSorted.indexOf(x)) >= 0) { return (i + 1) }
    if ((i = restSorted.indexOf(x)) >= 0) { return -(i + 1) }
    return NaN
  })
};

export { Rank, duorank as duoRank, duorank, rank, reorderBy };

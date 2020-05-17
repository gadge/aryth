import { NUM_DESC, STR_DESC } from '@aryth/comparer';
import { isNumeric } from '@typen/num-loose';
import { iterate, mapper } from '@vect/vector-mapper';

/**
 *
 * @param {*[]} ar
 * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
 * @param {function(*):boolean} [filter]
 * @return {number[]} Rank order array, where 0 denote the first.
 */
const rank = (ar, comparer, filter) => {
  const sorted = (!filter ? ar.slice() : ar.filter(filter)).sort(comparer);
  return ar.map(x => (x = sorted.indexOf(x)) >= 0 ? x : NaN);
};
/**
 *
 * @param {*[]} ar
 * @param {number[]} ranks array of the same length as 'arr', containing rank order of 'arr', 0 comes first.
 * @return {*[]}
 */

const reorderBy = (ar, ranks) => {
  const ve = Array(ar.length);

  for (let [i, ord] of ranks.entries()) ve[ord] = ar[i];

  return ve;
};

const isAlphabetic = x => /[A-Za-z0-9]+/.test(x);
/**
 *
 * @param words
 * @param filter
 * @param comparer
 * @param restFilter
 * @param restComparer
 * @return {number[]}
 */


const duoRank = (words, {
  filter = isNumeric,
  comparer = NUM_DESC
} = {}, {
  filter: restFilter = isAlphabetic,
  comparer: restComparer = STR_DESC
} = {}) => {
  const primVec = [],
        restVec = [];
  iterate(words, x => {
    if (filter(x)) return void primVec.push(x);
    if (restFilter(x)) return void restVec.push(x);
  });
  const primSorted = primVec.sort(comparer),
        restSorted = restVec.sort(restComparer);
  return mapper(words, x => {
    let i;

    if ((i = primSorted.indexOf(x)) >= 0) {
      return -(i + 1);
    }

    if ((i = restSorted.indexOf(x)) >= 0) {
      return i + 1;
    }

    return NaN;
  });
};

export { duoRank, rank, reorderBy };

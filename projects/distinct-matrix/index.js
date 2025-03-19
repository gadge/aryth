import { vectorDistinctor, objectDistinctor, entriesCounter, objectCounter, sortByValues } from '@aryth/util-distinct';
import { iterate } from '@vect/matrix-mapper';

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */
const distinct = function (mx, h, w) {
  let o;
  return (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, vectorDistinctor.bind(o), h, w), o)
    : (o = {}, iterate(mx, objectDistinctor.bind(o), h, w), Object.keys(o))
};

/**
 *
 * @param {*[]} mx
 * @param {string|boolean} [sort=false]
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */
const distinctCount = function (mx,{ sort, h, w}) {
  let o;
  const ents = (h = mx?.length) === (h & 0x7f)
    ? (o = [], iterate(mx, entriesCounter.bind(o), h, w), o)
    : (o = {}, iterate(mx, objectCounter.bind(o), h, w), Object.entries(o));
  if (sort) sortByValues(ents, sort);
  return ents
};

function distinctByColumn(mx, y) {
  let [ h, w ] = size(mx);
  if (!h || !w || y >= w) return [ [] ]
  let targetMx = [];
  for (let i = 0, sourceRow; i < h; i++) {
    sourceRow = mx[i];
    if (targetMx.findIndex(targetRow => targetRow[y] === sourceRow[y]) < 0) targetMx.push(sourceRow);
  }
  return targetMx
}

export { distinct, distinctByColumn, distinctCount };

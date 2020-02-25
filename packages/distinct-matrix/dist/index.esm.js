import { iterate } from '@vect/matrix-mapper';
import { distinctorAr, distinctorOb, counterEnt, counterOb, sortByValues } from '@aryth/util-distinct';

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */

const distinct = function (mx, h, w) {
  let o;
  return (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], iterate(mx, distinctorAr.bind(o), h, w), o) : (o = {}, iterate(mx, distinctorOb.bind(o), h, w), Object.keys(o));
};
/**
 *
 * @param {*[]} mx
 * @param {string|boolean} [sort=false]
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */

const distinctCount = function (mx, {
  sort,
  h,
  w
}) {
  let o;
  const ents = (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], iterate(mx, counterEnt.bind(o), h, w), o) : (o = {}, iterate(mx, counterOb.bind(o), h, w), Object.entries(o));
  if (sort) sortByValues(ents, sort);
  return ents;
};

export { distinct, distinctCount };

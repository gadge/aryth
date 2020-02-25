import { iterate } from '@vect/column-mapper';
import { distinctorAr, distinctorOb, counterEnt, counterOb, sortByValues } from '@aryth/util-distinct';

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @returns {[*,number][]}
 */

const distinct = function (mx, h) {
  let {
    y
  } = this;
  let o;
  return (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], iterate(mx, y, distinctorAr.bind(o), h), o) : (o = {}, iterate(mx, y, distinctorOb.bind(o), h), Object.keys(o));
};
/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {string|boolean} [sort=false]
 * @returns {[*,number][]}
 */

const distinctCount = function (mx, {
  h,
  sort
}) {
  let {
    y
  } = this;
  let o;
  const ents = (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], iterate(mx, y, counterEnt.bind(o), h), o) : (o = {}, iterate(mx, y, counterOb.bind(o), h), Object.entries(o));
  if (sort) sortByValues(ents, sort);
  return ents;
};
const Distinct = y => distinct.bind({
  y
});
const DistinctCount = y => distinctCount.bind({
  y
});

export { Distinct, DistinctCount, distinct, distinctCount };

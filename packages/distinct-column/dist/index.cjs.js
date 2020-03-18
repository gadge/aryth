'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var columnMapper = require('@vect/column-mapper');
var utilDistinct = require('@aryth/util-distinct');

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
  return (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], columnMapper.iterate(mx, y, utilDistinct.vectorDistinctor.bind(o), h), o) : (o = {}, columnMapper.iterate(mx, y, utilDistinct.objectDistinctor.bind(o), h), Object.keys(o));
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
  const ents = (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], columnMapper.iterate(mx, y, utilDistinct.entriesCounter.bind(o), h), o) : (o = {}, columnMapper.iterate(mx, y, utilDistinct.objectCounter.bind(o), h), Object.entries(o));
  if (sort) utilDistinct.sortByValues(ents, sort);
  return ents;
};
const Distinct = y => distinct.bind({
  y
});
const DistinctCount = y => distinctCount.bind({
  y
});

exports.Distinct = Distinct;
exports.DistinctCount = DistinctCount;
exports.distinct = distinct;
exports.distinctCount = distinctCount;

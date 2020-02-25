'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var matrixMapper = require('@vect/matrix-mapper');
var utilDistinct = require('@aryth/util-distinct');

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */

const distinct = function (mx, h, w) {
  let o;
  return (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], matrixMapper.iterate(mx, utilDistinct.distinctorAr.bind(o), h, w), o) : (o = {}, matrixMapper.iterate(mx, utilDistinct.distinctorOb.bind(o), h, w), Object.keys(o));
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
  const ents = (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], matrixMapper.iterate(mx, utilDistinct.counterEnt.bind(o), h, w), o) : (o = {}, matrixMapper.iterate(mx, utilDistinct.counterOb.bind(o), h, w), Object.entries(o));
  if (sort) utilDistinct.sortByValues(ents, sort);
  return ents;
};

exports.distinct = distinct;
exports.distinctCount = distinctCount;
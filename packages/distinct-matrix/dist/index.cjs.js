'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilDistinct = require('@aryth/util-distinct');
var matrixMapper = require('@vect/matrix-mapper');

/**
 *
 * @param {*[]} mx
 * @param {number} [h]
 * @param {number} [w]
 * @returns {[*,number][]}
 */

const distinct = function (mx, h, w) {
  let o;
  return (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], matrixMapper.iterate(mx, utilDistinct.vectorDistinctor.bind(o), h, w), o) : (o = {}, matrixMapper.iterate(mx, utilDistinct.objectDistinctor.bind(o), h, w), Object.keys(o));
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
  const ents = (h = mx === null || mx === void 0 ? void 0 : mx.length) === (h & 0x7f) ? (o = [], matrixMapper.iterate(mx, utilDistinct.entriesCounter.bind(o), h, w), o) : (o = {}, matrixMapper.iterate(mx, utilDistinct.objectCounter.bind(o), h, w), Object.entries(o));
  if (sort) utilDistinct.sortByValues(ents, sort);
  return ents;
};

exports.distinct = distinct;
exports.distinctCount = distinctCount;

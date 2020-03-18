'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vectorMapper = require('@vect/vector-mapper');
var utilDistinct = require('@aryth/util-distinct');

/**
 *
 * @param {*[]} arr
 * @param {number} [l]
 * @returns {[any, any][]|[]|any[]|*}
 */

const distinct = function (arr, l) {
  let o;
  return (l = arr === null || arr === void 0 ? void 0 : arr.length) === (l & 0x7f) ? (o = [], vectorMapper.iterate(arr, utilDistinct.vectorDistinctor.bind(o), l), o) : (o = {}, vectorMapper.iterate(arr, utilDistinct.objectDistinctor.bind(o), l), Object.keys(o));
};
/**
 *
 * @param {*[]} arr
 * @param {string|boolean} [sort=false]
 * @param {number} [l]
 * @returns {[any, any][]|[]|any[]|*}
 */

const distinctCount = function (arr, {
  sort,
  l
}) {
  let o;
  const ents = (l = arr === null || arr === void 0 ? void 0 : arr.length) === (l & 0x7f) ? (o = [], vectorMapper.iterate(arr, utilDistinct.entriesCounter.bind(o), l), o) : (o = {}, vectorMapper.iterate(arr, utilDistinct.objectCounter.bind(o), l), Object.entries(o));
  if (sort) utilDistinct.sortByValues(ents, sort);
  return ents;
};

exports.distinct = distinct;
exports.distinctCount = distinctCount;

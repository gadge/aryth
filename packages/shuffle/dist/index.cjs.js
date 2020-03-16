'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');
var swap = require('@vect/swap');
var rand = require('@aryth/rand');

/**
 * Fisher–Yates shuffle, a.k.a Knuth shuffle
 * @param {Array} ve
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Array} mutated array
 */

const shuffle = function (ve, size) {
  let l = ve.length;
  const lo = comparer.max(0, l - (size !== null && size !== void 0 ? size : l));

  for (--l; l >= lo; l--) swap.swap.call(ve, l, rand.rand(l));

  return lo ? (ve.splice(0, lo), ve) : ve;
};
/**
 *
 * Object keys can be set via 'this.keys'
 * Default keys are Object.keys(o), the enumerable list of o's keys.
 * @param {Object} o
 * @param {number} [size] - if omitted, size will be keys.length
 * @returns {Object} new object
 */

const shuffleObject = function (o, size) {
  const keys = (this === null || this === void 0 ? void 0 : this.keys) || Object.keys(o);
  let l = keys.length,
      k;
  const lo = comparer.max(0, l - (size !== null && size !== void 0 ? size : l)),
        rs = {};

  for (--l; l >= lo; l--) rs[k = swap.swap.call(keys, rand.rand(l), l)] = o[k];

  return rs;
};

exports.shuffle = shuffle;
exports.shuffleObject = shuffleObject;

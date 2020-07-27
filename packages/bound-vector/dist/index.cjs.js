'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var literal = require('@typen/literal');
var numStrict = require('@typen/num-strict');
var stringValue$1 = require('@spare/string-value');

const iniNumEntry = (ar, lo, hi, {
  level = 0
} = {}) => {
  for (let el, isNum = utilBound.IsNum(level); lo < hi; lo++) if (isNum(el = ar[lo])) return [lo, el];

  return [hi, NaN];
};

/**
 *
 * @param {*[]} vec
 */

function bound(vec) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    dif: false,
    level: enumCheckLevels.LOOSE
  };
  const toOutput = utilBound.boundOutput.bind(config),
        toNum = utilBound.ToNum(config.level);
  let l = vec === null || vec === void 0 ? void 0 : vec.length;
  if (!l) return toOutput(NaN, NaN);
  let [i, x] = iniNumEntry(vec, 0, l, config);
  let min,
      max = min = toNum(x);

  for (++i; i < l; i++) {
    var _vec$i;

    if ((x = (_vec$i = vec[i], toNum(_vec$i))) < min) {
      min = x;
    } else if (x > max) {
      max = x;
    }
  }

  return toOutput(max, min); // @returns {{min:number, max:number}|{min:number, dif:number}}
}
function leap(vec) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    level: enumCheckLevels.LOOSE
  };
  config.dif = true;
  return bound.call(config, vec);
}

const STR = 'string';

const v1 = word => (word.toLowerCase() & 0x7f) << 21;

const v2 = word => (((word = word.toLowerCase()) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14);

const v3 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7);

const v4 = word => (((word = word.toLowerCase()).charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7) + (word.charCodeAt(3) & 0x7f);

const stringValue = word => {
  const l = word === null || word === void 0 ? void 0 : word.length;
  if (!l) return NaN;
  if (typeof word !== STR) return NaN;
  if (l >= 8) return (v4(word.slice(0, 4)) << 2) + v4(word.slice(-4));
  if (l === 7) return (v4(word.slice(0, 4)) << 2) + v3(word.slice(-3));
  if (l === 6) return (v4(word.slice(0, 4)) << 2) + v2(word.slice(-2));
  if (l === 5) return (v4(word.slice(0, 4)) << 2) + v1(word.slice(-1));
  if (l === 4) return v4(word) << 2;
  if (l === 3) return v3(word) << 2;
  if (l === 2) return v2(word) << 2;
  if (l === 1) return v1(word) << 2;
};

const iterate = function (vec, fn, l) {
  l = l || vec && vec.length;

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const parseNumeric = x => +x;

/**
 *
 * @typedef {*[]} VectorWithBound
 * @typedef {number} VectorWithBound.max
 * @typedef {number} VectorWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[]} words
 * @param {FilterAndMapper} [optX]
 * @param {FilterAndMapper} [optY]
 * @return {[?VectorWithBound, ?VectorWithBound]}
 */

const duobound = function (words, [optX, optY] = []) {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  /** @type {?VectorWithBound} */

  let veX = undefined;
  /** @type {?VectorWithBound} */

  let veY = undefined;
  if (!l) return [veX, veY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : numStrict.isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNumeric;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : literal.hasLiteral,
        mapY = (_optY$mapper = optY === null || optY === void 0 ? void 0 : optY.mapper) !== null && _optY$mapper !== void 0 ? _optY$mapper : stringValue;
  iterate(words, (v, i) => {
    var _veX, _veY;

    if (filterX(v) && ((_veX = veX) !== null && _veX !== void 0 ? _veX : veX = Array(l))) {
      var _veX$max;

      v = mapX(v);

      if (v > ((_veX$max = veX.max) !== null && _veX$max !== void 0 ? _veX$max : veX.max = veX.min = v)) {
        veX.max = v;
      } else if (v < veX.min) {
        veX.min = v;
      }

      return veX[i] = v;
    }

    if (filterY(v) && ((_veY = veY) !== null && _veY !== void 0 ? _veY : veY = Array(l))) {
      var _veY$max;

      v = mapY(v);

      if (v > ((_veY$max = veY.max) !== null && _veY$max !== void 0 ? _veY$max : veY.max = veY.min = v)) {
        veY.max = v;
      } else if (v < veY.min) {
        veY.min = v;
      }

      return veY[i] = v;
    }

    return NaN;
  }, l);
  return [veX, veY];
};

/**
 *
 * @typedef {*[]} VectorWithBound
 * @typedef {number} VectorWithBound.max
 * @typedef {number} VectorWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[]} words
 * @param {FilterAndMapper} [opt]
 * @return {?VectorWithBound}
 */

const solebound = function (words, opt) {
  var _opt$filter, _opt$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  /** @type {?VectorWithBound} */

  let vec = undefined;
  if (!l) return vec;
  const filter = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : literal.hasLiteral,
        mapper = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : stringValue$1.stringValue;
  iterate(words, (v, i) => {
    var _vec;

    if (filter(v) && ((_vec = vec) !== null && _vec !== void 0 ? _vec : vec = Array(l))) {
      var _vec$max;

      v = mapper(v);

      if (v > ((_vec$max = vec.max) !== null && _vec$max !== void 0 ? _vec$max : vec.max = vec.min = v)) {
        vec.max = v;
      } else if (v < vec.min) {
        vec.min = v;
      }

      return vec[i] = v;
    }

    return NaN;
  }, l);
  return vec;
};

exports.bound = bound;
exports.duobound = duobound;
exports.leap = leap;
exports.solebound = solebound;

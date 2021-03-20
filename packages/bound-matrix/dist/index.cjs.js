'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var boundVector = require('@aryth/bound-vector');
var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var matrixSize = require('@vect/matrix-size');
var stringValue = require('@spare/string-value');
var literal = require('@typen/literal');
var numeral = require('@typen/numeral');
var matrixInit = require('@vect/matrix-init');
var matrixMapper = require('@vect/matrix-mapper');

const iniNumEntry = (mx, t, b, l, r, {
  level = 0
} = {}) => {
  for (let el, isNum = utilBound.IsNum(level); t < b; t++) for (l = 0; l < r; l++) if (isNum(el = mx[t][l])) return [t, l, el];

  return [b, r, NaN];
};

/**
 *
 * @param {*[]} mx
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

function bound(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
    level: enumCheckLevels.LOOSE
  };
  const embedLevel = {
    level: config.level
  };
  const toOutput = utilBound.boundOutput.bind(config),
        toNum = utilBound.ToNum(config.level);
  let [h, w] = matrixSize.size(mx);
  if (!h || !w) return toOutput(NaN, NaN);
  let [i,, el] = iniNumEntry(mx, 0, h, 0, w, config);
  let max,
      min = max = toNum(el),
      rowMax,
      rowMin;

  for (--h; h >= i && ({
    max: rowMax,
    min: rowMin
  } = boundVector.bound.call(embedLevel, mx[h])); h--) if (rowMin < min) {
    min = rowMin;
  } else if (rowMax > max) {
    max = rowMax;
  }

  return toOutput(max, min);
}

/**
 *
 * @typedef {*[][]} MatrixWithBound
 * @typedef {number} MatrixWithBound.max
 * @typedef {number} MatrixWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[][]} wordx
 * @param {FilterAndMapper} optX
 * @param {FilterAndMapper} optY
 * @return {[?MatrixWithBound, ?MatrixWithBound]}
 */


const duobound = (wordx, [optX, optY] = []) => {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const [h, w] = matrixSize.size(wordx);
  /** @type {?MatrixWithBound} */

  let x = undefined;
  /** @type {?MatrixWithBound} */

  let y = undefined;
  if (!h || !w) return [x, y];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : numeral.isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : numeral.parseNum;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : literal.hasLiteralAny,
        mapY = (_optY$mapper = optY === null || optY === void 0 ? void 0 : optY.mapper) !== null && _optY$mapper !== void 0 ? _optY$mapper : stringValue.stringValue;
  matrixMapper.iterate(wordx, (v, i, j) => {
    var _x, _y;

    if (filterX(v) && ((_x = x) !== null && _x !== void 0 ? _x : x = matrixInit.iso(h, w, undefined))) {
      var _x$max;

      v = mapX(v);

      if (v > ((_x$max = x.max) !== null && _x$max !== void 0 ? _x$max : x.max = x.min = v)) {
        x.max = v;
      } else if (v < x.min) {
        x.min = v;
      }

      return x[i][j] = v;
    }

    if (filterY(v) && ((_y = y) !== null && _y !== void 0 ? _y : y = matrixInit.iso(h, w, undefined))) {
      var _y$max;

      v = mapY(v);

      if (v > ((_y$max = y.max) !== null && _y$max !== void 0 ? _y$max : y.max = y.min = v)) {
        y.max = v;
      } else if (v < y.min) {
        y.min = v;
      }

      return y[i][j] = v;
    }

    return NaN;
  }, h, w);
  return [x, y];
};

const parseNumeric = x => +x;
/**
 *
 * @typedef {*[][]} MatrixWithBound
 * @typedef {number} MatrixWithBound.max
 * @typedef {number} MatrixWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[][]} wordx
 * @param {FilterAndMapper} [opt]
 * @return {?MatrixWithBound}
 */


const solebound = (wordx, opt) => {
  var _opt$filter, _opt$mapper;

  const [height, width] = matrixSize.size(wordx);
  /** @type {?MatrixWithBound} */

  let mx = undefined;
  if (!height || !width) return mx;
  const filterX = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : numeral.isNumeric,
        mapX = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : parseNumeric;
  matrixMapper.iterate(wordx, (v, i, j) => {
    var _mx;

    if (filterX(v) && ((_mx = mx) !== null && _mx !== void 0 ? _mx : mx = matrixInit.iso(height, width, undefined))) {
      var _mx$max;

      v = mapX(v);

      if (v > ((_mx$max = mx.max) !== null && _mx$max !== void 0 ? _mx$max : mx.max = mx.min = v)) {
        mx.max = v;
      } else if (v < mx.min) {
        mx.min = v;
      }

      return mx[i][j] = v;
    }

    return NaN;
  }, height, width);
  return mx;
};

exports.bound = bound;
exports.duobound = duobound;
exports.solebound = solebound;

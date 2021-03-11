'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var boundVector = require('@aryth/bound-vector');
var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var matrixSize = require('@vect/matrix-size');
var stringValue = require('@spare/string-value');
var literal = require('@typen/literal');
var numStrict = require('@typen/num-strict');
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

const parseNumeric$1 = x => +x;
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

  const [height, width] = matrixSize.size(wordx);
  /** @type {?MatrixWithBound} */

  let maX = undefined;
  /** @type {?MatrixWithBound} */

  let maY = undefined;
  if (!height || !width) return [maX, maY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : numStrict.isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNumeric$1;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : literal.hasLiteral,
        mapY = (_optY$mapper = optY === null || optY === void 0 ? void 0 : optY.mapper) !== null && _optY$mapper !== void 0 ? _optY$mapper : stringValue.stringValue;
  matrixMapper.iterate(wordx, (v, i, j) => {
    var _maX, _maY;

    if (filterX(v) && ((_maX = maX) !== null && _maX !== void 0 ? _maX : maX = matrixInit.iso(height, width, undefined))) {
      var _maX$max;

      v = mapX(v);

      if (v > ((_maX$max = maX.max) !== null && _maX$max !== void 0 ? _maX$max : maX.max = maX.min = v)) {
        maX.max = v;
      } else if (v < maX.min) {
        maX.min = v;
      }

      return maX[i][j] = v;
    }

    if (filterY(v) && ((_maY = maY) !== null && _maY !== void 0 ? _maY : maY = matrixInit.iso(height, width, undefined))) {
      var _maY$max;

      v = mapY(v);

      if (v > ((_maY$max = maY.max) !== null && _maY$max !== void 0 ? _maY$max : maY.max = maY.min = v)) {
        maY.max = v;
      } else if (v < maY.min) {
        maY.min = v;
      }

      return maY[i][j] = v;
    }

    return NaN;
  }, height, width);
  return [maX, maY];
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

  let mat = undefined;
  if (!height || !width) return mat;
  const filterX = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : numStrict.isNumeric,
        mapX = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : parseNumeric;
  matrixMapper.iterate(wordx, (v, i, j) => {
    var _mat;

    if (filterX(v) && ((_mat = mat) !== null && _mat !== void 0 ? _mat : mat = matrixInit.iso(height, width, undefined))) {
      var _mat$max;

      v = mapX(v);

      if (v > ((_mat$max = mat.max) !== null && _mat$max !== void 0 ? _mat$max : mat.max = mat.min = v)) {
        mat.max = v;
      } else if (v < mat.min) {
        mat.min = v;
      }

      return mat[i][j] = v;
    }

    return NaN;
  }, height, width);
  return mat;
};

exports.bound = bound;
exports.duobound = duobound;
exports.solebound = solebound;

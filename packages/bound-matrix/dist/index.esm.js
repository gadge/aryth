import { bound as bound$1 } from '@aryth/bound-vector';
import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { size } from '@vect/matrix-size';
import { stringValue } from '@spare/string';
import { hasLiteral } from '@typen/literal';
import { isNumeric } from '@typen/num-strict';
import { iso } from '@vect/matrix-init';
import { iterate } from '@vect/matrix-mapper';

const iniNumEntry = (mx, t, b, l, r, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++) for (l = 0; l < r; l++) if (isNum(el = mx[t][l])) return [t, l, el];

  return [b, r, NaN];
};

/**
 *
 * @param {*[]} mx
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

function bound(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    dif: false,
    level: LOOSE
  };
  const embedLevel = {
    level: config.level
  };
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
  let [h, w] = size(mx);
  if (!h || !w) return toOutput(NaN, NaN);
  let [i,, el] = iniNumEntry(mx, 0, h, 0, w, config);
  let max,
      min = max = toNum(el),
      rowMax,
      rowMin;

  for (--h; h >= i && ({
    max: rowMax,
    min: rowMin
  } = bound$1.call(embedLevel, mx[h])); h--) if (rowMin < min) {
    min = rowMin;
  } else if (rowMax > max) {
    max = rowMax;
  }

  return toOutput(max, min);
}
function leap(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    level: LOOSE
  };
  config.dif = true;
  return bound.call(config, mx);
}

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
 * @param {FilterAndMapper} optX
 * @param {FilterAndMapper} optY
 * @return {[?MatrixWithBound, ?MatrixWithBound]}
 */


const duobound = (wordx, [optX, optY] = []) => {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const [height, width] = size(wordx);
  /** @type {?MatrixWithBound} */

  let maX = undefined;
  /** @type {?MatrixWithBound} */

  let maY = undefined;
  if (!height || !width) return [maX, maY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNumeric;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : hasLiteral,
        mapY = (_optY$mapper = optY === null || optY === void 0 ? void 0 : optY.mapper) !== null && _optY$mapper !== void 0 ? _optY$mapper : stringValue;
  iterate(wordx, (v, i, j) => {
    var _maX, _maY;

    if (filterX(v) && ((_maX = maX) !== null && _maX !== void 0 ? _maX : maX = iso(height, width, undefined))) {
      var _maX$max;

      v = mapX(v);

      if (v > ((_maX$max = maX.max) !== null && _maX$max !== void 0 ? _maX$max : maX.max = maX.min = v)) {
        maX.max = v;
      } else if (v < maX.min) {
        maX.min = v;
      }

      return maX[i][j] = v;
    }

    if (filterY(v) && ((_maY = maY) !== null && _maY !== void 0 ? _maY : maY = iso(height, width, undefined))) {
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

  const [height, width] = size(wordx);
  /** @type {?MatrixWithBound} */

  let mat = undefined;
  if (!height || !width) return mat;
  const filterX = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : hasLiteral,
        mapX = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : stringValue;
  iterate(wordx, (v, i, j) => {
    var _mat;

    if (filterX(v) && ((_mat = mat) !== null && _mat !== void 0 ? _mat : mat = iso(height, width, undefined))) {
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

export { bound, duobound, leap, solebound };

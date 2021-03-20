import { bound as bound$1 } from '@aryth/bound-vector';
import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { size } from '@vect/matrix-size';
import { stringValue } from '@spare/string-value';
import { hasLiteralAny } from '@typen/literal';
import { isNumeric, parseNum } from '@typen/numeral';
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
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
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

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config} optX
 * @param {Config} optY
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */


const duobound = (wordx, [optX, optY] = []) => {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const [h, w] = size(wordx);
  /** @type {?BoundedMatrix} */

  let dtX = undefined;
  /** @type {?BoundedMatrix} */

  let dtY = undefined;
  if (!h || !w) return [dtX, dtY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : isNumeric,
        mapperX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNum;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : hasLiteralAny,
        mapperY = (_optY$mapper = optY === null || optY === void 0 ? void 0 : optY.mapper) !== null && _optY$mapper !== void 0 ? _optY$mapper : stringValue;
  iterate(wordx, (v, i, j) => {
    var _dtX, _dtY;

    if (filterX(v) && ((_dtX = dtX) !== null && _dtX !== void 0 ? _dtX : dtX = iso(h, w, undefined))) {
      var _dtX$max;

      v = mapperX(v);

      if (v > ((_dtX$max = dtX.max) !== null && _dtX$max !== void 0 ? _dtX$max : dtX.max = dtX.min = v)) {
        dtX.max = v;
      } else if (v < dtX.min) {
        dtX.min = v;
      }

      return dtX[i][j] = v;
    }

    if (filterY(v) && ((_dtY = dtY) !== null && _dtY !== void 0 ? _dtY : dtY = iso(h, w, undefined))) {
      var _dtY$max;

      v = mapperY(v);

      if (v > ((_dtY$max = dtY.max) !== null && _dtY$max !== void 0 ? _dtY$max : dtY.max = dtY.min = v)) {
        dtY.max = v;
      } else if (v < dtY.min) {
        dtY.min = v;
      }

      return dtY[i][j] = v;
    }

    return NaN;
  }, h, w);
  return [dtX, dtY];
};

const parseNumeric = x => +x;
/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config} [opt]
 * @return {?BoundedMatrix}
 */


const solebound = (wordx, opt) => {
  var _opt$filter, _opt$mapper;

  const [height, width] = size(wordx);
  /** @type {?BoundedMatrix} */

  let mx = undefined;
  if (!height || !width) return mx;
  const filterX = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : isNumeric,
        mapX = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : parseNumeric;
  iterate(wordx, (v, i, j) => {
    var _mx;

    if (filterX(v) && ((_mx = mx) !== null && _mx !== void 0 ? _mx : mx = iso(height, width, undefined))) {
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

export { bound, duobound, solebound };

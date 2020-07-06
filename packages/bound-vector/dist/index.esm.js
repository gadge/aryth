import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { stringValue } from '@spare/string';
import { hasLiteral } from '@typen/literal';
import { isNumeric } from '@typen/num-strict';

const iniNumEntry = (ar, lo, hi, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); lo < hi; lo++) if (isNum(el = ar[lo])) return [lo, el];

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
    level: LOOSE
  };
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
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
    level: LOOSE
  };
  config.dif = true;
  return bound.call(config, vec);
}

const iterate = function (vec, fn, l) {
  l = l || vec && vec.length;

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const parseNumeric = x => +x;

/**
 *
 * @typedef {?Array} MatrixWithBound
 * @typedef {number} MatrixWithBound.max
 * @typedef {number} MatrixWithBound.min
 *
 * @typedef {Object} FilterAndMapper
 * @typedef {Function} FilterAndMapper.filter
 * @typedef {Function} FilterAndMapper.mapper
 *
 * @param {*[]} words
 * @param {FilterAndMapper} optX
 * @param {FilterAndMapper} optY
 * @return {[MatrixWithBound, MatrixWithBound]}
 */

const duobound = function (words, [optX, optY] = []) {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  /** @type {MatrixWithBound} */

  let veX = undefined;
  /** @type {MatrixWithBound} */

  let veY = undefined;
  if (!l) return [veX, veY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNumeric;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : hasLiteral,
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

export { bound, duobound, leap };

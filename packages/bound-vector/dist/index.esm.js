import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { stringValue } from '@spare/string-value';
import { hasLiteralAny } from '@typen/literal';
import { isNumeric } from '@typen/numeral';

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
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
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

const iterate = function (vec, fn, l) {
  l = l || (vec === null || vec === void 0 ? void 0 : vec.length);

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const parseNumeric = x => +x;

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [optX]
 * @param {Config} [optY]
 * @return {[?BoundedVector, ?BoundedVector]}
 */

const duobound = function (words, [optX, optY] = []) {
  var _optX$filter, _optX$mapper, _optY$filter, _optY$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  let veX = undefined,
      veY = undefined;
  if (!l) return [veX, veY];
  const filterX = (_optX$filter = optX === null || optX === void 0 ? void 0 : optX.filter) !== null && _optX$filter !== void 0 ? _optX$filter : isNumeric,
        mapX = (_optX$mapper = optX === null || optX === void 0 ? void 0 : optX.mapper) !== null && _optX$mapper !== void 0 ? _optX$mapper : parseNumeric;
  const filterY = (_optY$filter = optY === null || optY === void 0 ? void 0 : optY.filter) !== null && _optY$filter !== void 0 ? _optY$filter : hasLiteralAny,
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
 * @typedef {*[]} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.filter
 * @typedef {Function} Config.mapper
 *
 * @param {*[]} words
 * @param {Config} [opt]
 * @return {?BoundedVector}
 */

const solebound = function (words, opt) {
  var _opt$filter, _opt$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  /** @type {?BoundedVector} */

  let vec = undefined;
  if (!l) return vec;
  const filter = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : isNumeric,
        mapper = (_opt$mapper = opt === null || opt === void 0 ? void 0 : opt.mapper) !== null && _opt$mapper !== void 0 ? _opt$mapper : parseNumeric;
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

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */

const multibound = function (words, configs) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  const vectorCollection = configs.map(x => undefined);
  if (!l) return vectorCollection;
  iterate(words, (v, i) => configs.some(({
    filter,
    mapper
  }, j) => {
    var _vec;

    let vec = vectorCollection[j];

    if (filter(v) && ((_vec = vec) !== null && _vec !== void 0 ? _vec : vec = vectorCollection[j] = Array(l))) {
      var _vec$max;

      v = mapper(v);

      if (v > ((_vec$max = vec.max) !== null && _vec$max !== void 0 ? _vec$max : vec.max = vec.min = v)) {
        vec.max = v;
      } else if (v < vec.min) {
        vec.min = v;
      }

      return vec[i] = v, true;
    }
  }), l);
  return vectorCollection;
};

/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */

const boundaries = function (words, configs) {
  const count = configs.length;
  if (count > 2) return multibound(words, configs);
  if (count === 2) return duobound(words, configs);
  if (count === 1) return [solebound(words, configs[0])];
  return [];
};

export { bound, boundaries, duobound, solebound };

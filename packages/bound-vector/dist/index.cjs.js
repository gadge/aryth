'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var stringValue = require('@spare/string-value');
var literal = require('@typen/literal');
var numeral = require('@typen/numeral');

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
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
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
 * @param {Config} [configX]
 * @param {Config} [configY]
 * @return {[?BoundedVector, ?BoundedVector]}
 */

const duobound = function (words, [configX = {}, configY = {}] = []) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  let vecX = undefined,
      vecY = undefined;
  if (!l) return [vecX, vecY];
  const filterX = configX.filter,
        mapperX = configX.mapper;
  const filterY = configY.filter,
        mapperY = configY.mapper;
  iterate(words, (v, i) => {
    var _vecX, _vecY;

    if (filterX(v) && ((_vecX = vecX) !== null && _vecX !== void 0 ? _vecX : vecX = Array(l))) {
      var _vecX$max;

      v = mapperX(v);

      if (v > ((_vecX$max = vecX.max) !== null && _vecX$max !== void 0 ? _vecX$max : vecX.max = vecX.min = v)) {
        vecX.max = v;
      } else if (v < vecX.min) {
        vecX.min = v;
      }

      return vecX[i] = v;
    }

    if (filterY(v) && ((_vecY = vecY) !== null && _vecY !== void 0 ? _vecY : vecY = Array(l))) {
      var _vecY$max;

      v = mapperY(v);

      if (v > ((_vecY$max = vecY.max) !== null && _vecY$max !== void 0 ? _vecY$max : vecY.max = vecY.min = v)) {
        vecY.max = v;
      } else if (v < vecY.min) {
        vecY.min = v;
      }

      return vecY[i] = v;
    }

    return NaN;
  }, l);
  return [vecX, vecY];
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
  const filter = (_opt$filter = opt === null || opt === void 0 ? void 0 : opt.filter) !== null && _opt$filter !== void 0 ? _opt$filter : numeral.isNumeric,
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

  if (count === 2) {
    var _x$filter, _x$mapper, _y$filter, _y$mapper;

    const [x = {}, y = {}] = configs;
    x.filter = (_x$filter = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter !== void 0 ? _x$filter : numeral.isNumeric, x.mapper = (_x$mapper = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper !== void 0 ? _x$mapper : numeral.parseNum;
    y.filter = (_y$filter = y === null || y === void 0 ? void 0 : y.filter) !== null && _y$filter !== void 0 ? _y$filter : literal.hasLiteralAny, y.mapper = (_y$mapper = y === null || y === void 0 ? void 0 : y.mapper) !== null && _y$mapper !== void 0 ? _y$mapper : stringValue.stringValue;
    return duobound(words, configs);
  }

  if (count === 1) {
    var _x$filter2, _x$mapper2;

    const [x = {}] = configs;
    x.filter = (_x$filter2 = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter2 !== void 0 ? _x$filter2 : numeral.isNumeric, x.mapper = (_x$mapper2 = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper2 !== void 0 ? _x$mapper2 : numeral.parseNum;
    return [solebound(words, configs[0])];
  }

  return [];
};

exports.bound = bound;
exports.boundaries = boundaries;
exports.duobound = duobound;
exports.solebound = solebound;

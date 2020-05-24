'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var literal = require('@typen/literal');
var numLoose = require('@typen/num-loose');
var vectorMapper = require('@vect/vector-mapper');

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

const stringValue = word => {
  let l = word === null || word === void 0 ? void 0 : word.length;

  if (!l) {
    return NaN;
  }

  if (l >= 4) {
    return ((word.charCodeAt(0) & 0x7f) << 21) + ((word.charCodeAt(1) & 0x7f) << 14) + ((word.charCodeAt(2) & 0x7f) << 7) + (word.charCodeAt(3) & 0x7f);
  }

  if (l === 3) {
    return ((word.charCodeAt(0) & 0x7f) << 21) + (word.charCodeAt(1) & 0x7f) << 14 + ((word.charCodeAt(2) & 0x7f) << 7);
  }

  if (l === 2) {
    return ((word.charCodeAt(0) & 0x7f) << 21) + (word.charCodeAt(1) & 0x7f) << 14;
  }

  if (l === 1) {
    return (word.charCodeAt(0) & 0x7f) << 21;
  }
};

const oneself = x => x;
const duobound = (words, x = {}, y = {}) => {
  const l = words === null || words === void 0 ? void 0 : words.length;
  let vecX = undefined,
      vecY = undefined;
  const {
    filter: filterX = numLoose.isNumeric,
    mapper: mapperX = oneself
  } = x;
  const {
    filter: filterY = literal.isLiteral,
    mapper: mapperY = stringValue
  } = y;
  vectorMapper.iterate(words, (v, i) => {
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

exports.bound = bound;
exports.duobound = duobound;
exports.leap = leap;

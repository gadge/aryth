'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var string = require('@spare/string');
var literal = require('@typen/literal');
var numStrict = require('@typen/num-strict');

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

const iterate = function (vec, fn, l) {
  l = l || vec && vec.length;

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

const parseNumeric = x => +x;

const duobound = function (words, [x, y] = []) {
  var _x$filter, _x$mapper, _y$filter, _y$mapper;

  const l = words === null || words === void 0 ? void 0 : words.length;
  let vX = undefined,
      vY = undefined;
  if (!l) return [vX, vY];
  const filterX = (_x$filter = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter !== void 0 ? _x$filter : numStrict.isNumeric,
        mapperX = (_x$mapper = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper !== void 0 ? _x$mapper : parseNumeric;
  const filterY = (_y$filter = y === null || y === void 0 ? void 0 : y.filter) !== null && _y$filter !== void 0 ? _y$filter : literal.isLiteral,
        mapperY = (_y$mapper = y === null || y === void 0 ? void 0 : y.mapper) !== null && _y$mapper !== void 0 ? _y$mapper : string.stringValue;
  iterate(words, (v, i) => {
    var _vX, _vY;

    if (filterX(v) && ((_vX = vX) !== null && _vX !== void 0 ? _vX : vX = Array(l))) {
      var _vX$max;

      v = mapperX(v);

      if (v > ((_vX$max = vX.max) !== null && _vX$max !== void 0 ? _vX$max : vX.max = vX.min = v)) {
        vX.max = v;
      } else if (v < vX.min) {
        vX.min = v;
      }

      return vX[i] = v;
    }

    if (filterY(v) && ((_vY = vY) !== null && _vY !== void 0 ? _vY : vY = Array(l))) {
      var _vY$max;

      v = mapperY(v);

      if (v > ((_vY$max = vY.max) !== null && _vY$max !== void 0 ? _vY$max : vY.max = vY.min = v)) {
        vY.max = v;
      } else if (v < vY.min) {
        vY.min = v;
      }

      return vY[i] = v;
    }

    return NaN;
  }, l);
  return [vX, vY];
};

exports.bound = bound;
exports.duobound = duobound;
exports.leap = leap;

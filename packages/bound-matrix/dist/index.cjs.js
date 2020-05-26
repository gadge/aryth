'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var boundVector = require('@aryth/bound-vector');
var utilBound = require('@aryth/util-bound');
var enumCheckLevels = require('@typen/enum-check-levels');
var matrixSize = require('@vect/matrix-size');
var oneself = require('@ject/oneself');
var string = require('@spare/string');
var literal = require('@typen/literal');
var numLoose = require('@typen/num-loose');
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
  const config = this || {
    dif: false,
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
function leap(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    level: enumCheckLevels.LOOSE
  };
  config.dif = true;
  return bound.call(config, mx);
}

const duobound = (wordx, x = {}, y = {}) => {
  const [h, w] = matrixSize.size(wordx);
  let vecX = undefined,
      vecY = undefined;
  if (!h || !w) return [vecX, vecY];
  const {
    filter: filterX = numLoose.isNumeric,
    mapper: mapperX = oneself.oneself
  } = x;
  const {
    filter: filterY = literal.isLiteral,
    mapper: mapperY = string.stringValue
  } = y;
  matrixMapper.iterate(wordx, (v, i, j) => {
    var _vecX, _vecY;

    if (filterX(v) && ((_vecX = vecX) !== null && _vecX !== void 0 ? _vecX : vecX = matrixInit.iso(h, w, undefined))) {
      var _vecX$max;

      v = mapperX(v);

      if (v > ((_vecX$max = vecX.max) !== null && _vecX$max !== void 0 ? _vecX$max : vecX.max = vecX.min = v)) {
        vecX.max = v;
      } else if (v < vecX.min) {
        vecX.min = v;
      }

      return vecX[i][j] = v;
    }

    if (filterY(v) && ((_vecY = vecY) !== null && _vecY !== void 0 ? _vecY : vecY = matrixInit.iso(h, w, undefined))) {
      var _vecY$max;

      v = mapperY(v);

      if (v > ((_vecY$max = vecY.max) !== null && _vecY$max !== void 0 ? _vecY$max : vecY.max = vecY.min = v)) {
        vecY.max = v;
      } else if (v < vecY.min) {
        vecY.min = v;
      }

      return vecY[i][j] = v;
    }

    return NaN;
  }, h, w);
  return [vecX, vecY];
};

exports.bound = bound;
exports.duobound = duobound;
exports.leap = leap;

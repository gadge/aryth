import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { stringValue } from '@spare/string';
import { isLiteral } from '@typen/literal';
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

const duobound = function (words, [x = {}, y = {}] = []) {
  const l = words === null || words === void 0 ? void 0 : words.length;
  let vecX = undefined,
      vecY = undefined;
  if (!l) return [vecX, vecY];
  const {
    filter: filterX = isNumeric,
    mapper: mapperX = parseNumeric
  } = x;
  const {
    filter: filterY = isLiteral,
    mapper: mapperY = stringValue
  } = y;
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

export { bound, duobound, leap };

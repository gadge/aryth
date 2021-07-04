import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { stringValue } from '@texting/string-value';
import { hasLiteral } from '@typen/literal';
import { isNumeric, parseNum } from '@typen/numeral';

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
  const config = this ?? {
    dif: true,
    level: LOOSE
  };
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
  let l = vec == null ? void 0 : vec.length;
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
  l = l || (vec == null ? void 0 : vec.length);

  for (let i = 0; i < l; i++) fn.call(this, vec[i], i);
};

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

const duobound = function (words, [configX, configY] = []) {
  const l = words == null ? void 0 : words.length;
  let vecX = undefined,
      vecY = undefined;
  if (!l) return [vecX, vecY];
  const {
    filter: filterX,
    mapper: mapperX
  } = configX,
        {
    filter: filterY,
    mapper: mapperY
  } = configY;
  iterate(words, (v, i) => {
    if (filterX(v) && (vecX ?? (vecX = Array(l)))) {
      v = mapperX(v);

      if (v > (vecX.max ?? (vecX.max = vecX.min = v))) {
        vecX.max = v;
      } else if (v < vecX.min) {
        vecX.min = v;
      }

      return vecX[i] = v;
    }

    if (filterY(v) && (vecY ?? (vecY = Array(l)))) {
      v = mapperY(v);

      if (v > (vecY.max ?? (vecY.max = vecY.min = v))) {
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
 * @param {Config} [config]
 * @return {?BoundedVector}
 */

const solebound = function (words, config) {
  const l = words == null ? void 0 : words.length;
  let vec = undefined;
  if (!l) return vec;
  const {
    filter,
    mapper
  } = config;
  if (!filter) return vec;
  iterate(words, (v, i) => {
    if (filter(v) && (vec ?? (vec = Array(l)))) {
      v = mapper(v);

      if (v > (vec.max ?? (vec.max = vec.min = v))) {
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
  const l = words == null ? void 0 : words.length;
  const vectorCollection = configs.map(x => undefined);
  if (!l) return vectorCollection;
  iterate(words, (v, i) => configs.some(({
    filter,
    mapper
  }, j) => {
    let vec = vectorCollection[j];

    if (filter(v) && (vec ?? (vec = vectorCollection[j] = Array(l)))) {
      v = mapper(v);

      if (v > (vec.max ?? (vec.max = vec.min = v))) {
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
  if (count === 0) return [];

  if (count === 1) {
    const [x = {}] = configs;
    x.filter = (x == null ? void 0 : x.filter) ?? isNumeric, x.mapper = (x == null ? void 0 : x.mapper) ?? parseNum;
    return [solebound(words, configs[0])];
  }

  if (count === 2) {
    const [x, y] = configs;
    const fX = (x == null ? void 0 : x.filter) ?? isNumeric,
          mX = (x == null ? void 0 : x.mapper) ?? parseNum;
    const fY = (y == null ? void 0 : y.filter) ?? hasLiteral,
          mY = (y == null ? void 0 : y.mapper) ?? stringValue;
    return duobound(words, [{
      filter: fX,
      mapper: mX
    }, {
      filter: fY,
      mapper: mY
    }]);
  }

  if (count >= 3) return multibound(words, configs);
};

export { bound, boundaries, duobound, solebound };

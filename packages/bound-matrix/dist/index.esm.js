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
 * @param {Config} configX
 * @param {Config} configY
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */


const duobound = (wordx, [configX = {}, configY = {}] = []) => {
  const [h, w] = size(wordx);
  /** @type {?BoundedMatrix} */

  let dtX = undefined;
  /** @type {?BoundedMatrix} */

  let dtY = undefined;
  if (!h || !w) return [dtX, dtY];
  const filterX = configX.filter,
        mapperX = configX.mapper;
  const filterY = configY.filter,
        mapperY = configY.mapper;
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
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */


const multibound = (wordx, configs) => {
  const [h, w] = size(wordx);
  const matrixCollection = configs.map(_ => undefined);
  if (!h || !w) return matrixCollection;
  iterate(wordx, (v, i, j) => {
    configs.some(({
      filter,
      mapper
    }, k) => {
      var _mx;

      let mx = matrixCollection[k];

      if (filter(v) && ((_mx = mx) !== null && _mx !== void 0 ? _mx : mx = matrixCollection[k] = iso(h, w, undefined))) {
        var _mx$max;

        v = mapper(v);

        if (v > ((_mx$max = mx.max) !== null && _mx$max !== void 0 ? _mx$max : mx.max = mx.min = v)) {
          mx.max = v;
        } else if (v < mx.min) {
          mx.min = v;
        }

        mx[i][j] = v;
        return true;
      }
    });
  }, h, w);
  return matrixCollection;
};

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.filter
 * @typedef {function(*):number} Config.mapper
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */

const boundaries = function (wordx, configs = []) {
  const count = configs.length;
  if (count > 2) return multibound(wordx, configs);

  if (count === 2) {
    var _x$filter, _x$mapper, _y$filter, _y$mapper;

    const [x = {}, y = {}] = configs;
    x.filter = (_x$filter = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter !== void 0 ? _x$filter : isNumeric, x.mapper = (_x$mapper = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper !== void 0 ? _x$mapper : parseNum;
    y.filter = (_y$filter = y === null || y === void 0 ? void 0 : y.filter) !== null && _y$filter !== void 0 ? _y$filter : hasLiteralAny, y.mapper = (_y$mapper = y === null || y === void 0 ? void 0 : y.mapper) !== null && _y$mapper !== void 0 ? _y$mapper : stringValue;
    return duobound(wordx, [x, y]);
  }

  if (count === 1) {
    var _x$filter2, _x$mapper2;

    const [x = {}] = configs;
    x.filter = (_x$filter2 = x === null || x === void 0 ? void 0 : x.filter) !== null && _x$filter2 !== void 0 ? _x$filter2 : isNumeric, x.mapper = (_x$mapper2 = x === null || x === void 0 ? void 0 : x.mapper) !== null && _x$mapper2 !== void 0 ? _x$mapper2 : parseNum;
    return [solebound(wordx, x)];
  }

  return [];
};

export { bound, boundaries, duobound, solebound };

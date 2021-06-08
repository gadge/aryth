import { bound as bound$1 } from '@aryth/bound-vector';
import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { size } from '@vect/matrix-size';
import { iso } from '@vect/matrix-init';
import { iterate } from '@vect/matrix-mapper';
import { stringValue } from '@texting/string-value';
import { hasLiteral } from '@typen/literal';
import { isNumeric, parseNum } from '@typen/numeral';

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
  const config = this ?? {
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


const duobound = (wordx, [configX, configY] = []) => {
  const [h, w] = size(wordx);
  let matX = undefined,
      matY = undefined;
  if (!h || !w) return [matX, matY];
  const {
    filter: filterX,
    mapper: mapperX
  } = configX,
        {
    filter: filterY,
    mapper: mapperY
  } = configY;
  iterate(wordx, (v, i, j) => {
    if (filterX(v) && (matX ?? (matX = iso(h, w, undefined)))) {
      v = mapperX(v);

      if (v > (matX.max ?? (matX.max = matX.min = v))) {
        matX.max = v;
      } else if (v < matX.min) {
        matX.min = v;
      }

      return matX[i][j] = v;
    }

    if (filterY(v) && (matY ?? (matY = iso(h, w, undefined)))) {
      v = mapperY(v);

      if (v > (matY.max ?? (matY.max = matY.min = v))) {
        matY.max = v;
      } else if (v < matY.min) {
        matY.min = v;
      }

      return matY[i][j] = v;
    }

    return NaN;
  }, h, w);
  return [matX, matY];
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
 * @param {Config} [config]
 * @return {?BoundedMatrix}
 */


const solebound = (wordx, config) => {
  const [height, width] = size(wordx);
  /** @type {?BoundedMatrix} */

  let mx = undefined;
  if (!height || !width) return mx;
  const {
    filter,
    mapper
  } = config;
  iterate(wordx, (v, i, j) => {
    if (filter(v) && (mx ?? (mx = iso(height, width, undefined)))) {
      v = mapper(v);

      if (v > (mx.max ?? (mx.max = mx.min = v))) {
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
      let mx = matrixCollection[k];

      if (filter(v) && (mx ?? (mx = matrixCollection[k] = iso(h, w, undefined)))) {
        v = mapper(v);

        if (v > (mx.max ?? (mx.max = mx.min = v))) {
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
  if (count === 0) return [];

  if (count === 1) {
    const [x] = configs;
    const filter = (x == null ? void 0 : x.filter) ?? isNumeric,
          mapper = (x == null ? void 0 : x.mapper) ?? parseNum;
    return [solebound(wordx, {
      filter,
      mapper
    })];
  }

  if (count === 2) {
    const [x, y] = configs;
    const fX = (x == null ? void 0 : x.filter) ?? isNumeric,
          mX = (x == null ? void 0 : x.mapper) ?? parseNum;
    const fY = (y == null ? void 0 : y.filter) ?? hasLiteral,
          mY = (y == null ? void 0 : y.mapper) ?? stringValue;
    return duobound(wordx, [{
      filter: fX,
      mapper: mX
    }, {
      filter: fY,
      mapper: mY
    }]);
  }

  if (count >= 3) return multibound(wordx, configs);
};

export { bound, boundaries, duobound, solebound };

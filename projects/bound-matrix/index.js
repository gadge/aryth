import { bound as bound$1 } from '@aryth/bound-vector';
import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { size } from '@vect/matrix-index';
import { iso } from '@vect/matrix-init';
import { iterate } from '@vect/matrix-mapper';
import { stringValue } from '@texting/string-value';
import { hasLiteral } from '@typen/literal';
import { isNumeric, parseNum } from '@typen/numeral';

const firstCoord = (mx, t, b, l, r, {level = 0} = {}) => {
  for (let i = t, by = IsNum(level); i < b; i++)
    for (let j = l, v; j < r; j++)
      if (by(v = mx[i][j])) return [ i, j, v ]
  return [ b, r, NaN ]
};

/**
 *
 * @param {*[]} mx
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
function bound(mx) {
  /** @type {{dif: boolean, level: number}} */ const config = this ?? {dif: true, level: LOOSE};
  const embedLevel = {level: config.level};
  const toOutput = boundOutput.bind(config), toNum = ToNum(config.level);
  let [ h, w ] = size(mx);
  if (!h || !w) return toOutput(NaN, NaN)
  let [ i, , v ] = firstCoord(mx, 0, h, 0, w, config);
  let max, min = max = toNum(v), rowMax, rowMin;
  for (--h; h >= i && ({max: rowMax, min: rowMin} = bound$1.call(embedLevel, mx[h])); h--)
    if (rowMin < min) { min = rowMin; }
    else if (rowMax > max) { max = rowMax; }
  return toOutput(max, min)
}

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.by
 * @typedef {Function} Config.to
 *
 * @param {*[][]} wordx
 * @param {Config} x
 * @param {Config} y
 * @return {[?BoundedMatrix, ?BoundedMatrix]}
 */
const duobound = (wordx, [ x, y ] = []) => {
  const [ h, w ] = size(wordx);
  let mX = null, mY = null;
  if (!h || !w) return [ mX, mY ]
  iterate(
    wordx,
    (v, i, j) => {
      if (x.by(v) && (mX ?? (mX = iso(h, w, null)))) {
        if ((v = x.to(v)) > (mX.max ?? (mX.max = mX.min = v))) { mX.max = v; } else if (v < mX.min) { mX.min = v; }
        return mX[i][j] = v
      }
      if (y.by(v) && (mY ?? (mY = iso(h, w, null)))) {
        if ((v = y.to(v)) > (mY.max ?? (mY.max = mY.min = v))) { mY.max = v; } else if (v < mY.min) { mY.min = v; }
        return mY[i][j] = v
      }
      return NaN
    },
    h, w
  );
  return [ mX, mY ]
};

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.by
 * @typedef {Function} Config.to
 *
 * @param {*[][]} wordx
 * @param {Config} [config]
 * @return {?BoundedMatrix}
 */
const solebound = (wordx, config) => {
  const [height, width] = size(wordx),{ by, to } = config;
  if (!height || !width) return null
  /** @type {?BoundedMatrix} */ let mx = null;
  iterate(
    wordx,
    (v, i, j) => {
      if (by(v) && (mx ?? (mx = iso(height, width, null)))) {
        v = to(v);
        if (v > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v; } else if (v < mx.min) { mx.min = v; }
        return mx[i][j] = v
      }
      return NaN
    },
    height, width
  );
  return mx
};

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {Function} Config.by
 * @typedef {Function} Config.to
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */
const multibound = (wordx, configs) => {
  const [ h, w ] = size(wordx);
  const matrices = configs.map(_ => null);
  if (!h || !w) return matrices
  iterate(
    wordx,
    (v, i, j) => {
      configs.some(({by, to}, k) => {
        let mx = matrices[k];
        if (by(v) && (mx ?? (mx = (matrices[k] = iso(h, w, null))))) {
          if ((v = to(v)) > (mx.max ?? (mx.max = mx.min = v))) { mx.max = v; } else if (v < mx.min) { mx.min = v; }
          mx[i][j] = v;
          return true
        }
      });
    },
    h, w
  );
  return matrices
};

/**
 *
 * @typedef {*[][]} BoundedMatrix
 * @typedef {number} BoundedMatrix.max
 * @typedef {number} BoundedMatrix.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
 *
 * @param {*[][]} wordx
 * @param {Config[]} configs
 * @return {?BoundedMatrix[]}
 */
const boundaries = function (wordx, configs = []) {
  const count = configs.length;
  if (count === 0) return []
  if (count === 1) {
    const [x] = configs;
    const by = x?.by ?? isNumeric, to = x?.to ?? parseNum;
    return [solebound(wordx, { by, to })]
  }
  if (count === 2) {
    const [x, y] = configs;
    const fX = x?.by ?? isNumeric, mX = x?.to ?? parseNum;
    const fY = y?.by ?? hasLiteral, mY = y?.to ?? stringValue;
    return duobound(wordx, [{ by: fX, to: mX }, { by: fY, to: mY }])
  }
  if (count >= 3) return multibound(wordx, configs)
};

export { bound, boundaries, duobound, solebound };

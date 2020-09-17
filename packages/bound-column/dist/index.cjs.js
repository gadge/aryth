'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumCheckLevels = require('@typen/enum-check-levels');
var utilBound = require('@aryth/util-bound');
var matrixSize = require('@vect/matrix-size');

const iniNumEntry = (mx, t, b, c, {
  level = 0
} = {}) => {
  for (let el, isNum = utilBound.IsNum(level); t < b; t++) if (isNum(el = mx[t][c])) return [t, el];

  return [b, NaN];
};

function columnBound(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this !== null && this !== void 0 ? this : {
    dif: false,
    level: enumCheckLevels.LOOSE
  };
  const {
    y
  } = this;
  const toOutput = utilBound.boundOutput.bind(config),
        toNum = utilBound.ToNum(config.level);
  let [h, w] = matrixSize.size(mx);
  if (!h || !w || y >= w) return toOutput(NaN, NaN);
  let [i, x] = iniNumEntry(mx, 0, h, y, config),
      max,
      min = max = toNum(x);

  for (++i; i < h; i++) if ((x = toNum(mx[i][y])) < min) {
    min = x;
  } else if (x > max) {
    max = x;
  }

  return toOutput(max, min);
}
const ColumnBound = (y, level = enumCheckLevels.LOOSE) => columnBound.bind({
  y,
  level
});

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

const bound = function (mx, y) {
  /** @type {{dif: boolean, level: number, y:number}} */
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
    level: enumCheckLevels.LOOSE
  };
  config.y = y;
  return columnBound.call(config, mx);
};

exports.ColumnBound = ColumnBound;
exports.bound = bound;

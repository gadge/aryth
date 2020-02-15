'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilBound = require('@aryth/util-bound');
var matrixSize = require('@vect/matrix-size');
var boundVector = require('@aryth/bound-vector');

const iniNumEntry = (mx, t, b, l, r, {
  level = 0
} = {}) => {
  for (let el, isNum = utilBound.IsNum(level); t < b; t++) for (l = 0; l < r; l++) if (isNum(el = mx[t][l])) return [t, l, el];

  return [b, r, NaN];
};

/**
 *
 * @param {*[]} mx
 * @param {boolean} [dif=false]
 * @param {number} [level=0]
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

function bound(mx, {
  dif = false,
  level = utilBound.NUM_LEVEL_NONE
} = {}) {
  const bo = utilBound.BoundOutput(dif),
        toNum = utilBound.ToNum(level);
  let [h, w] = matrixSize.size(mx);
  if (!h || !w) return bo(NaN, NaN);
  let [i,, el] = iniNumEntry(mx, 0, h, 0, w, {
    level
  });
  let max,
      min = max = toNum(el),
      maxR,
      minR;

  for (--h; h >= i && ({
    max: maxR,
    min: minR
  } = boundVector.bound(mx[h], {
    level
  })); h--) if (minR < min) {
    min = minR;
  } else if (maxR > max) {
    max = maxR;
  }

  return bo(max, min);
}

exports.bound = bound;

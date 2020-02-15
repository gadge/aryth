import { IsNum, NUM_LEVEL_NONE, BoundOutput, ToNum } from '@aryth/util-bound';
import { size } from '@vect/matrix-size';
import { bound as bound$1 } from '@aryth/bound-vector';

const iniNumEntry = (mx, t, b, l, r, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++) for (l = 0; l < r; l++) if (isNum(el = mx[t][l])) return [t, l, el];

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
  level = NUM_LEVEL_NONE
} = {}) {
  const bo = BoundOutput(dif),
        toNum = ToNum(level);
  let [h, w] = size(mx);
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
  } = bound$1(mx[h], {
    level
  })); h--) if (minR < min) {
    min = minR;
  } else if (maxR > max) {
    max = maxR;
  }

  return bo(max, min);
}

export { bound };

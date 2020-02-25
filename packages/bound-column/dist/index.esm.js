import { IsNum, NUM_LEVEL_NONE, BoundOutput, ToNum } from '@aryth/util-bound';
import { size } from '@vect/matrix-size';

const iniNumEntry = (mx, t, b, c, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++) if (isNum(el = mx[t][c])) return [t, el];

  return [b, NaN];
};

function columnBound(mx, {
  dif = false,
  level = NUM_LEVEL_NONE
} = {}) {
  const {
    y
  } = this;
  const bo = BoundOutput(dif),
        toNum = ToNum(level);
  let [h, w] = size(mx);
  if (!h || !w || y >= w) return bo(NaN, NaN);
  let [i, x] = iniNumEntry(mx, 0, h, y, {
    level
  }),
      max,
      min = max = toNum(x);

  for (++i; i < h; i++) if ((x = toNum(mx[i][y])) < min) {
    min = x;
  } else if (x > max) {
    max = x;
  }

  return bo(max, min);
}
const ColumnBound = y => columnBound.bind({
  y
});

/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {boolean} [dif=false]
 * @param {number} [level=0] - level: 0, none; 1, loose; 2, strict
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

const bound = (mx, y, {
  dif = false,
  level = NUM_LEVEL_NONE
} = {}) => columnBound.call({
  y
}, mx, {
  dif,
  level
});

export { ColumnBound, bound };
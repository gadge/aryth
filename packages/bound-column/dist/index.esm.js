import { LOOSE } from '@typen/enum-check-levels';
import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { size } from '@vect/matrix-size';

const iniNumEntry = (mx, t, b, c, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++) if (isNum(el = mx[t][c])) return [t, el];

  return [b, NaN];
};

function columnBound(mx) {
  /** @type {{dif: boolean, level: number}} */
  const config = this || {
    dif: false,
    level: LOOSE
  };
  const {
    y
  } = this;
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
  let [h, w] = size(mx);
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
const ColumnBound = (y, level = LOOSE) => columnBound.bind({
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
  const config = this || {
    level: LOOSE
  };
  config.y = y;
  return columnBound.call(config, mx);
};

export { ColumnBound, bound };

import { IsNum, NUM_LEVEL_NONE, BoundOutput, ToNum } from '@aryth/util-bound';

const iniNumEntry = (ar, lo, hi, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); lo < hi; lo++) if (isNum(el = ar[lo])) return [lo, el];

  return [hi, NaN];
};

/**
 *
 * @param {*[]} arr
 * @param {boolean} [dif=false]
 * @param {number} [level=0] 0:no check, 1:loose, 2:strict
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */

function bound(arr, {
  dif = false,
  level = NUM_LEVEL_NONE
} = {}) {
  const bo = BoundOutput(dif),
        toNum = ToNum(level);
  let l = arr && arr.length;
  if (!l) return bo(NaN, NaN);
  let [i, x] = iniNumEntry(arr, 0, l, {
    level
  });
  let min,
      max = min = toNum(x);

  for (++i; i < l; i++) {
    var _arr$i;

    if ((x = (_arr$i = arr[i], toNum(_arr$i))) < min) {
      min = x;
    } else if (x > max) {
      max = x;
    }
  }

  return bo(max, min);
}

export { bound };

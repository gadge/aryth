import { IsNum, boundOutput, ToNum } from '@aryth/util-bound';
import { LOOSE } from '@typen/enum-check-levels';
import { iterate } from '@vect/vector-mapper';

const firstEntry = (vec, lo, hi, {level = 0} = {}) => {
  for (let v, by = IsNum(level); lo < hi; lo++)
    if (by(v = vec[lo])) return [ lo, v ]
  return [ hi, NaN ]
};

/**
 *
 * @param {*[]} vec
 */
function bound(vec) {
  /** @type {{dif: boolean, level: number}} */ const cfg = this ?? {dif: true, level: LOOSE};
  const toOutput = boundOutput.bind(cfg), toNum = ToNum(cfg.level);
  let hi = vec?.length;
  if (!hi) return toOutput(NaN, NaN)
  let [ i, x ] = firstEntry(vec, 0, hi, cfg);
  let min, max = min = toNum(x);
  for (++i; i < hi; i++) if ((x = toNum(vec[i])) < min) { min = x; } else if (x > max) { max = x; }
  return toOutput(max, min)
}

// export const NUM_BOUND_CONF_HALF = { by: isNumeric, to: parseNum }
// export const STR_BOUND_CONF_HALF = { by: isLiteral, to: stringValue }
// function wash(configs) {
//   const petals = configs.length
//   if (petals === 1) {
//     const [ x ] = configs
//     if (x.by) {x}
//   }
//   if (petals === 2) {}
//
// }
/**
 *
 * @typedef {Array} BoundedVector
 * @typedef {number} BoundedVector.max
 * @typedef {number} BoundedVector.min
 *
 * @typedef {Object} Config
 * @typedef {function(*):boolean} Config.by
 * @typedef {function(*):number} Config.to
 *
 * @param {*[]} words
 * @param {Config[]} configs
 * @return {?BoundedVector[]}
 */
const boundaries = function (words, configs) {
  const count = configs.length;
  if (count === 0) return []
  if (count === 1) return [ solebound(words, configs[0]) ]
  if (count === 2) return duobound(words, configs)
  return multibound(words, configs)
};

function solebound(words, config) {
  const size = words?.length;
  let vec = undefined;
  if (!size) return vec
  const { by, to } = config;
  if (!by) return vec
  for (let i = 0, v; i < size; i++) {
    if (by(v = words[i]) && (vec ?? (vec = Array(size)))) {
      if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v; }
      else if (v < vec.min) { vec.min = v; }
      vec[i] = v;
    }
  }
  return vec
}

function duobound(words, [ x, y ] = []) {
  const hi = words?.length;
  let veX = null, veY = null;
  if (!hi) return [ veX, veY ]
  iterate(words, (v, i) => {
      if (x.by && x.by(v) && (veX ?? (veX = Array(hi)))) {
        if ((v = x.to(v)) > (veX.max ?? (veX.max = veX.min = v))) { veX.max = v; }
        else if (v < veX.min) { veX.min = v; }
        return veX[i] = v
      }
      if (y.by && y.by(v) && (veY ?? (veY = Array(hi)))) {
        if ((v = y.to(v)) > (veY.max ?? (veY.max = veY.min = v))) { veY.max = v; }
        else if (v < veY.min) { veY.min = v; }
        return veY[i] = v
      }
      return NaN
    },
    hi);
  return [ veX, veY ]
}

function multibound(words, configs) {
  const l = words?.length;
  const vectors = configs.map(_ => null);
  if (!l) return vectors
  iterate(words,
    (v, i) => configs.some(
      ({ by, to }, j) => {
        let vec = vectors[j];
        if (by && by(v) && (vec ?? (vec = (vectors[j] = Array(l))))) {
          if ((v = to(v)) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v; } else if (v < vec.min) { vec.min = v; }
          return vec[i] = v, true
        }
      }),
    l);
  return vectors
}

export { bound, boundaries, duobound, solebound };

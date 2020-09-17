'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var numLoose = require('@typen/num-loose');
require('@typen/literal');

const NONE = 0;
const LOOSE = 1;
const STRICT = 2;

/**
 *
 * @type {Function|function(*):string}
 */
const protoType = Function.prototype.call.bind(Object.prototype.toString);

const isNumeric = x => !isNaN(x - parseFloat(x));
/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */


const validate = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum = x => validate(x, parseFloat(x));

const IsNum = (level = NONE) => {
  if (level === NONE) return x => !isNaN(x);
  if (level === LOOSE) return numLoose.isNumeric;
  if (level === STRICT) return isNumeric;
  return isNumeric;
};

const ToNum = (level = 0) => {
  if (level === NONE) return x => x;
  if (level === LOOSE) return numLoose.parseNum;
  if (level === STRICT) return parseNum;
  return parseNum;
};

function boundOutput(max, min) {
  const {
    dif
  } = this;
  return dif ? {
    min,
    dif: max - min,
    max
  } : {
    min,
    max
  };
}

const iniNumEntry = (ar, lo, hi, {
  level = 0
} = {}) => {
  for (let el, isNum = IsNum(level); lo < hi; lo++) if (isNum(el = ar[lo])) return [lo, el];

  return [hi, NaN];
};
/**
 *
 * @param {*[]} vec
 */


function bound(vec) {
  /** @type {{dif: boolean, level: number}} */
  const config = this !== null && this !== void 0 ? this : {
    dif: true,
    level: LOOSE
  };
  const toOutput = boundOutput.bind(config),
        toNum = ToNum(config.level);
  let l = vec === null || vec === void 0 ? void 0 : vec.length;
  if (!l) return toOutput(NaN, NaN);
  let [i, x] = iniNumEntry(vec, 0, l, config);
  let min,
      max = min = toNum(x);

  for (++i; i < l; i++) {
    var _vec$i;

    if ((x = (_vec$i = vec[i], toNum(_vec$i))) < min) {
      min = x;
    } else if (x > max) {
      max = x;
    }
  }

  return toOutput(max, min); // @returns {{min:number, max:number}|{min:number, dif:number}}
}

const projector = function (n) {
  const {
    min: m,
    lever: l,
    base: b
  } = this;
  return (n - m) * l + b;
};
/**
 *
 * @param {Object} x
 * @param {number} x.max
 * @param {number} x.min
 *
 * @param {Object} y
 * @param {number} y.max
 * @param {number} y.min
 *
 * @return {Function|function(number):number}
 */


const Projector = (x, y) => {
  const {
    max,
    min
  } = x;
  const lever = max !== min ? (y.max - y.min) / (max - min) : 0;
  const base = y.min;
  return projector.bind({
    min,
    lever,
    base
  });
};

/**
 *
 * @param {*[]} vec
 * @param {number} max
 * @param {number} min
 * @return {number[]}
 */

const project = function (vec, {
  max,
  min
} = {}) {
  var _max, _min;

  /** @type {{level:number,max:number,min:number}} */
  const config = this !== null && this !== void 0 ? this : {};
  max = (_max = max) !== null && _max !== void 0 ? _max : config.max;
  min = (_min = min) !== null && _min !== void 0 ? _min : config.min;
  const projector = Projector(bound.call(config, vec), {
    max,
    min
  });
  return vec.map(projector);
};
const Project = ({
  max,
  min,
  level
}) => project.bind({
  max,
  min,
  level
});

exports.Project = Project;
exports.project = project;

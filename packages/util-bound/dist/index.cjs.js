'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumCheckLevels = require('@typen/enum-check-levels');
var numLoose = require('@typen/num-loose');
var numStrict = require('@typen/num-strict');

const NUM_LEVEL_NONE = enumCheckLevels.NONE;
const NUM_LEVEL_LOOSE = enumCheckLevels.LOOSE;
const NUM_LEVEL_STRICT = enumCheckLevels.STRICT;
const NumLevel = {
  none: NUM_LEVEL_NONE,
  loose: NUM_LEVEL_LOOSE,
  strict: NUM_LEVEL_STRICT
};

const IsNum = (level = enumCheckLevels.NONE) => {
  if (level === enumCheckLevels.NONE) return x => !isNaN(x);
  if (level === enumCheckLevels.LOOSE) return numLoose.isNumeric;
  if (level === enumCheckLevels.STRICT) return numStrict.isNumeric;
  return numStrict.isNumeric;
};

const ToNum = (level = 0) => {
  if (level === enumCheckLevels.NONE) return x => x;
  if (level === enumCheckLevels.LOOSE) return numLoose.parseNum;
  if (level === enumCheckLevels.STRICT) return numStrict.parseNum;
  return numStrict.parseNum;
};

function boundOutput(max, min) {
  const {
    dif
  } = this;
  return dif ? {
    min,
    dif: max - min
  } : {
    max,
    min
  };
}
const BoundOutput = dif => boundOutput.bind({
  dif
});

exports.BoundOutput = BoundOutput;
exports.IsNum = IsNum;
exports.NUM_LEVEL_LOOSE = NUM_LEVEL_LOOSE;
exports.NUM_LEVEL_NONE = NUM_LEVEL_NONE;
exports.NUM_LEVEL_STRICT = NUM_LEVEL_STRICT;
exports.NumLevel = NumLevel;
exports.ToNum = ToNum;
exports.boundOutput = boundOutput;

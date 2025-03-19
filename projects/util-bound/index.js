import { STRICT, LOOSE, NONE } from '@typen/enum-check-levels';
import { isNumeric, parseNum } from '@typen/num-loose';
import { isNumeric as isNumeric$1, parseNum as parseNum$1 } from '@typen/num-strict';

const NUM_LEVEL_NONE = NONE;
const NUM_LEVEL_LOOSE = LOOSE;
const NUM_LEVEL_STRICT = STRICT;

const NumLevel = {
  none: NUM_LEVEL_NONE,
  loose: NUM_LEVEL_LOOSE,
  strict: NUM_LEVEL_STRICT
};

const IsNum = (level = NONE) => {
  if (level === NONE) return x => !isNaN(x)
  if (level === LOOSE) return isNumeric
  if (level === STRICT) return isNumeric$1
  return isNumeric$1
};

const ToNum = (level = 0) => {
  if (level === NONE) return x => x
  if (level === LOOSE) return parseNum
  if (level === STRICT) return parseNum$1
  return parseNum$1
};

function boundOutput(max, min) {
  const { dif } = this;
  return dif
    ? { min, dif: max - min, max }
    : { min, max }
}

const BoundOutput = dif => boundOutput.bind({ dif });

export { BoundOutput, IsNum, NUM_LEVEL_LOOSE, NUM_LEVEL_NONE, NUM_LEVEL_STRICT, NumLevel, ToNum, boundOutput };

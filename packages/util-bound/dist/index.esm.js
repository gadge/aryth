import { Num, NumLoose } from 'typen';

const NUM_LEVEL_NONE = 0;
const NUM_LEVEL_LOOSE = 1;
const NUM_LEVEL_STRICT = 2;
const NumLevel = {
  none: NUM_LEVEL_NONE,
  loose: NUM_LEVEL_LOOSE,
  strict: NUM_LEVEL_STRICT
};

const IsNum = (level = 0) => {
  switch (level) {
    case 0:
      return x => !isNaN(x);

    case 1:
      return NumLoose.isNumeric;

    case 2:
    default:
      return Num.isNumeric;
  }
};

const ToNum = (level = 0) => {
  switch (level) {
    case 0:
      return x => x;

    case 1:
      return NumLoose.numeric;

    case 2:
    default:
      return Num.numeric;
  }
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

export { BoundOutput, IsNum, NUM_LEVEL_LOOSE, NUM_LEVEL_NONE, NUM_LEVEL_STRICT, NumLevel, ToNum };

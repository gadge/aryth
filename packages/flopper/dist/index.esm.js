import { swap } from '@vect/swap';
import { rand, flop } from '@aryth/rand';

const infiniteFlopper = function* (ar, df) {
  var _df, _ar;

  let l = ar.length;

  while (--l >= 0) yield swap.call(ar, rand(l), l);

  df = (_df = df) !== null && _df !== void 0 ? _df : (_ar = ar, flop(_ar));

  while (true) yield df;
};
const finiteFlopper = function* (ar) {
  let l = ar.length;

  while (--l >= 0) yield swap.call(ar, rand(l), l);

  return void 0;
};

export { finiteFlopper, finiteFlopper as flopGenerator, infiniteFlopper };

import { rand, flop } from '@aryth/rand';
import { swap } from '@vect/swap';

const infiniteFlopper = function* (ar, df) {
  var _ar;

  let l = ar.length;

  while (--l >= 0) yield swap.call(ar, rand(l), l);

  df = df ?? (_ar = ar, flop(_ar));

  while (true) yield df;
};
const finiteFlopper = function* (ar) {
  let l = ar.length;

  while (--l >= 0) yield swap.call(ar, rand(l), l);

  return void 0;
};

export { finiteFlopper, finiteFlopper as flopGenerator, infiniteFlopper };

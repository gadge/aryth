import { rand, flop } from '@aryth/rand';
import { swap } from '@vect/swap';

const infiniteFlopper = function* (ar, df) {
  let hi = ar.length;
  while (--hi >= 0) yield swap.call(ar, rand(hi), hi);
  df = df ?? flop(ar);
  while (true) yield df;
};

const finiteFlopper = function* (ar) {
  let hi = ar.length;
  while (--hi >= 0) yield swap.call(ar, rand(hi), hi);
  return void 0
};

export { finiteFlopper, finiteFlopper as flopGenerator, infiniteFlopper };

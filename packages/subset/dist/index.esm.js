import { iso } from '@vect/vector-init';
import { select } from '@vect/vector-select';
import { swap } from '@vect/swap';

function* combinator(vec, count = vec.length) {
  var _vec;

  if (!((_vec = vec) != null && _vec.length)) vec = [];
  if (!count) count = vec.length;
  const indexes = iso(count, -1),
        hi = vec.length;
  let lo = 0;

  while (lo >= 0) {
    if (indexes[lo] + count < lo + hi) {
      for (let k = indexes[lo] - lo + 1; lo < count; lo++) indexes[lo] = k + lo;

      yield select(vec, indexes, count);
    } else {
      lo--;
    }
  }
}

function* permutator(vec) {
  let hi = vec.length,
      c = iso(hi, 0),
      lo = 1;
  yield vec.slice();

  while (lo < hi) {
    if (c[lo] < lo) {
      swap.call(vec, lo, lo % 2 && c[lo]);
      ++c[lo];
      lo = 1;
      yield vec.slice();
    } else {
      c[lo] = 0;
      ++lo;
    }
  }
}

export { combinator, permutator };

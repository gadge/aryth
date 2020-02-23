const {
  random
} = Math;
const rand = l => ~~(random() * l);
/**
 * From [min, max) return a random integer.
 * Of [min, max), min is inclusive but max is exclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(exclusive) - int
 * @returns {number} int
 */

const randInt = (lo, hi) => rand(hi - lo) + lo;
/**
 * From [min, max] return a random integer.
 * Of [min, max], both min and max are inclusive.
 * @param {number} lo(inclusive) - int
 * @param {number} hi(inclusive) - int
 * @returns {number} int
 */

const randIntBetw = (lo, hi) => rand(++hi - lo) + lo;

const flopIndex = ar => rand(ar.length);
const flop = ar => ar[flopIndex(ar)];
const flopEntry = ob => {
  var _Object$entries;

  return _Object$entries = Object.entries(ob), flop(_Object$entries);
};

function indexShuffler(ar) {
  let length = this.length || ar.length;
  let size = Math.min(length, this.size);
  const vec = Array(size);

  for (let i = 0, set = new Set(), rn; i < size; i++) {
    do {
      var _length;

      rn = (_length = length, rand(_length));
    } while (set.has(rn));

    set.add(rn);
    vec[i] = rn;
  }

  return vec;
}
const shuffler = function (ar) {
  return indexShuffler.call(this, ar).map(i => ar[i]);
};
const Shuffler = size => shuffler.bind({
  size
});

const shuffle = (ar, size) => shuffler.call({
  length: ar.length,
  size
}, ar);

export { Shuffler, flop, flopEntry, flopIndex, rand, randInt, randIntBetw, shuffle };

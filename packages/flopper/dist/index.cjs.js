'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rand = require('@aryth/rand');
var swap = require('@vect/swap');

const infiniteFlopper = function* (ar, df) {
  var _df, _ar;

  let l = ar.length;

  while (--l >= 0) yield swap.swap.call(ar, rand.rand(l), l);

  df = (_df = df) !== null && _df !== void 0 ? _df : (_ar = ar, rand.flop(_ar));

  while (true) yield df;
};
const finiteFlopper = function* (ar) {
  let l = ar.length;

  while (--l >= 0) yield swap.swap.call(ar, rand.rand(l), l);

  return void 0;
};

exports.finiteFlopper = finiteFlopper;
exports.flopGenerator = finiteFlopper;
exports.infiniteFlopper = infiniteFlopper;

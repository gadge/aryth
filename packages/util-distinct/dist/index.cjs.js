'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const distinctorAr = function (x) {
  if (this.indexOf(x) < 0) this.push(x);
};

const distinctorOb = function (x) {
  if (!(x in this)) this[x] = void 0;
};

const counterEnt = function (x) {
  let j = this.findIndex(ent => x === ent[0]);
  j >= 0 ? this[j][1]++ : this.push([x, 1]);
};

const counterOb = function (x) {
  x in this ? this[x]++ : this[x] = 1;
};

function sortByValues(entries, sort) {
  switch (sort) {
    case true:
    case 'desc':
      return entries.sort(([, a], [, b]) => b - a);

    case 'asc':
      return entries.sort(([, a], [, b]) => a - b);

    case false:
    default:
      return entries;
  }
}

exports.counterEnt = counterEnt;
exports.counterOb = counterOb;
exports.distinctorAr = distinctorAr;
exports.distinctorOb = distinctorOb;
exports.sortByValues = sortByValues;

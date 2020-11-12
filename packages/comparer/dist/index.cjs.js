'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const STR_ASC = (a, b) => a.localeCompare(b);
const STR_DESC = (a, b) => b.localeCompare(a);
const NUM_ASC = (a, b) => a - b;
const NUM_DESC = (a, b) => b - a;

const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

exports.NUM_ASC = NUM_ASC;
exports.NUM_DESC = NUM_DESC;
exports.STR_ASC = STR_ASC;
exports.STR_DESC = STR_DESC;
exports.max = max;
exports.min = min;

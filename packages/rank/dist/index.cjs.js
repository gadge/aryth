'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var RankVector = require('@aryth/rank-vector');
var RankMatrix = require('@aryth/rank-matrix');
var RankColumn = require('@aryth/rank-column');
var ComparerCollection = require('@aryth/comparer');

const {
  NUM_ASC,
  NUM_DESC,
  STR_ASC,
  STR_DESC
} = ComparerCollection;
const {
  rank: rankVector
} = RankVector;
const {
  rank: rankMatrix
} = RankMatrix;
const {
  ColumnRank,
  MutateRank
} = RankColumn;

exports.ColumnRank = ColumnRank;
exports.MutateRank = MutateRank;
exports.NUM_ASC = NUM_ASC;
exports.NUM_DESC = NUM_DESC;
exports.STR_ASC = STR_ASC;
exports.STR_DESC = STR_DESC;
exports.rankMatrix = rankMatrix;
exports.rankVector = rankVector;

import * as RankVector from '@aryth/rank-vector';
import * as RankMatrix from '@aryth/rank-matrix';
import * as RankColumn from '@aryth/rank-column';
import * as ComparerCollection from '@aryth/comparer';

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

export { ColumnRank, MutateRank, NUM_ASC, NUM_DESC, STR_ASC, STR_DESC, rankMatrix, rankVector };

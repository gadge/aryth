import * as RankVector from '@aryth/rank-vector'
import * as RankMatrix from '@aryth/rank-matrix'
import * as RankColumn from '@aryth/rank-column'
import * as ComparerCollection from '@aryth/comparer'

export const { NUM_ASC, NUM_DESC, STR_ASC, STR_DESC } = ComparerCollection
export const { rank: rankVector } = RankVector
export const { rank: rankMatrix } = RankMatrix
export const { ColumnRank, MutateRank } = RankColumn

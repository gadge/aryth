import { column, ColumnMapper, ColumnMutate } from '@vect/column'

export function sort (mx, y, comparer, by) {
  let col = column(mx, y)
  if (by) col = col.filter(by)
  return col.sort(comparer)
}

export function columnRank (mx, comparer, by) {
  const { y } = this
  const sorted = sort(mx, y, comparer, filter)
  return ColumnMapper(y,false)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
}

export function mutateRank (mx, comparer, filter) {
  const { y } = this
  const sorted = sort(mx, y, comparer, filter)
  return ColumnMutate(y)(mx, x => (x = sorted.indexOf(x)) >= 0 ? x : NaN)
}

export const ColumnRank = (y) => columnRank.bind({ y })

export const MutateRank = (y) => mutateRank.bind({ y })

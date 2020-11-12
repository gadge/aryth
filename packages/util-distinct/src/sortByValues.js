export function sortByValues (entries, sort) {
  switch (sort) {
    case true:
    case 'desc':
      return entries.sort(([, a], [, b]) => b - a)
    case 'asc':
      return entries.sort(([, a], [, b]) => a - b)
    case false:
    default:
      return entries
  }
}

const rules = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
}

// not precise, need revision
export const romanRev = roman => {
  let m = 0, acc = 0, len = roman?.length
  if (!len) return 0
  roman = roman.toUpperCase()
  for (let n, i = len; i-- && (n = rules[roman[i]]);) {
    if (!n) continue
    if (n > m) m = n
    if (n < m) acc -= n
    else acc += n
    // xr(({ i, m, n, x: acc }) |> deco)[roman[i]](n) |> says['info']
  }
  return acc
}


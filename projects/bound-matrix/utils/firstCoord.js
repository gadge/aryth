import { IsNum } from '@aryth/util-bound'

export const firstCoord = (mx, t, b, l, r, {level = 0} = {}) => {
  for (let i = t, by = IsNum(level); i < b; i++)
    for (let j = l, v; j < r; j++)
      if (by(v = mx[i][j])) return [ i, j, v ]
  return [ b, r, NaN ]
}

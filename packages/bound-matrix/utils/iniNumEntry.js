import { IsNum } from '@aryth/util-bound'

export const iniNumEntry = (mx, t, b, l, r, { level = 0 } = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++)
    for (l = 0; l < r; l++)
      if (isNum(el = mx[t][l]))
        return [t, l, el]
  return [b, r, NaN]
}

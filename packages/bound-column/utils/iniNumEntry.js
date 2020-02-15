import { IsNum } from '@aryth/util-bound'

export const iniNumEntry = (mx, t, b, c, { level = 0 } = {}) => {
  for (let el, isNum = IsNum(level); t < b; t++)
    if (isNum(el = mx[t][c]))
      return [t, el]
  return [b, NaN]
}

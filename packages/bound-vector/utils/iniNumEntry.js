import { IsNum } from '@aryth/util-bound'

export const iniNumEntry = (ar, lo, hi, { level = 0 } = {}) => {
  for (let el, isNum = IsNum(level); lo < hi; lo++)
    if (isNum(el = ar[lo]))
      return [lo, el]
  return [hi, NaN]
}

import { IsNum } from '@aryth/util-bound'

export const firstEntry = (vec, lo, hi, {level = 0} = {}) => {
  for (let v, by = IsNum(level); lo < hi; lo++)
    if (by(v = vec[lo])) return [ lo, v ]
  return [ hi, NaN ]
}

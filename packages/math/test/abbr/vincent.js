import { E1, E10, E12, E13, E15, E3, E4, E6, E7, E9 } from '../../assets/large.js'
import { round, roundD2 }                             from '../../index.js'

export function abbrVinc(num) {
  if (!num) return 0
  if (-0.01 < num && num < 0.01) return num.toExponential(1)
  if (-E3 < num && num < E3) return roundD2(num)
  const sign = num > 0 ? '' : '-', abs = Math.abs(num)
  if (abs < E6) return sign + round(abs / E1) / 100 + "k"
  if (abs < E9) return sign + round(abs / E4) / 100 + "m"
  if (abs < E12) return sign + round(abs / E7) / 100 + "b"
  if (abs < E15) return sign + round(abs / E10) / 100 + "t"
  return sign + round(abs / E13) * 100 + "q"
}
import { round } from '@aryth/math'

export const isEven = n => !(n % 2)

export const ticksByMean = (mean, stdev, gaps) => {
  const ticks = (gaps = round(gaps)) + 1
  let lo = mean - stdev * (ticks >> 1)
  if (isEven(ticks)) lo += stdev / 2
  return tickLabels(lo, stdev, gaps)
}

export const tickLabels = (lo, step, gaps) => {
  const ve = Array(gaps + 1)
  let i = 0
  do { ve[i++] = lo, lo += step } while (i <= gaps)
  return ve
}

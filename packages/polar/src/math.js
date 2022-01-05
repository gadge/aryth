const { abs, min, max, PI } = Math

export const degreeToRadian = degree => degree * PI / 180
export const radianToDegree = radian => radian * 180 / PI

export const distance = (θa, θb) => {
  const d = abs(θa - θb)
  return min(d, abs(360 - d))
}

export const add = (θa, θb) => {
  return restrict(θa + θb)
}

export const minus = (θa, θb) => {
  const rawDf = θa - θb,
        posDf = abs(rawDf),
        negDf = abs(360 - posDf)
  return posDf <= negDf
    ? rawDf > 0 ? posDf : -posDf
    : rawDf < 0 ? negDf : -negDf
}

export const near = (θa, θb, epsilon) => {
  return distance(θa, θb) <= epsilon
}

export const contains = (interval, th) => {
  const [ a, b ] = interval
  return a <= b ? a < th && th < b : a < th || th < b
}

export const restrict = (th) => {
  while (th > 360) th -= 360
  while (th < 0) th += 360
  return th
}
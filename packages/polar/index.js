const { abs, min, max, PI } = Math

export const degreeToRadian = degree => degree * PI / 180
export const radianToDegree = radian => radian * 180 / PI
export const distance = (a, b) => {
  const d = abs(a - b)
  return min(d, abs(360 - d))
}
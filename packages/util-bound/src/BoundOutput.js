export function boundOutput(max, min) {
  const { dif } = this
  return dif
    ? { min, dif: max - min, max }
    : { min, max }
}

export const BoundOutput = dif => boundOutput.bind({ dif })


export function boundOutput (max, min) {
  const { dif } = this
  return dif
    ? { min, dif: max - min }
    : { max, min }
}

export const BoundOutput = (dif) => boundOutput.bind({ dif })

export const toBound = (max, min, dif) => boundOutput.call({ dif }, max, min)

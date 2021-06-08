const SYMBOLS = [ "", "K", "M", "G", "T", "P", "E" ]

export function abbreviateNumber(num, digit = 1, symbols = SYMBOLS, padding = true) {
  // handle negatives
  const sign = Math.sign(num) >= 0
  num = Math.abs(num)

  // what tier? (determines SI symbol)
  const tier = ( Math.log10(num) / 3 ) | 0

  // if zero, we don't need a suffix
  if (tier === 0) return num.toString()

  // get suffix and determine scale
  const suffix = symbols[tier]
  if (!suffix) throw new RangeError()

  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = num / scale

  let rounded = scaled.toFixed(digit)
  if (!padding) rounded = String(Number(rounded))

  // format number and add suffix
  return ( sign ? "" : "-" ) + rounded + suffix
}

export { abbreviateNumber as abbrMoh }
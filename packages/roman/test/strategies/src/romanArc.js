const lex = [
  [/CM/i, 900],
  [/CD/i, 400],
  [/XC/i, 90],
  [/XL/i, 40],
  [/IV/i, 4],
  [/IX/i, 9],
  [/I/i, 1],
  [/V/i, 5],
  [/X/i, 10],
  [/L/i, 50],
  [/C/i, 100],
  [/D/i, 500],
  [/M/i, 1000]
]
const UNMAPPED = 'Q'

export const romanArc = str => {
  let arab = 0
  for (let [regex, quant] of lex) {
    while (str.match(regex)) {
      arab += quant
      str = str.replace(regex, UNMAPPED)
    }
  }
  return arab
}

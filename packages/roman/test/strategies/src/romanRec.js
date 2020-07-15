// dctTrans :: {romanKey: Integer}

const rules = {
  M: 1E3,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

const recursiveParser = (roman) => {
  for (let key in rules) if (roman.startsWith(key)) return [rules[key], roman.substring(key.length)]
  return []
}

export const romanRec = roman => {
  if (!roman?.length) return 0
  const [value, rest] = recursiveParser(roman)
  // ({ roman, value, rest }) |> deco |> says[roman]
  return value + romanRec(rest)
}
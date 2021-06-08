const SCALES = [ '', 'k', 'm', 'b', 't' ]

export function abbrNumber(value) {
  let v = value
  if (value >= 1000) {
    const index = ~~( ( '' + value ).length / 3 )
    let abbr = ''
    for (let precision = 2; precision >= 1; precision--) {
      abbr = parseFloat(( index !== 0 ? value / 1000 ** index : value ).toPrecision(precision))
      const dotLessShortValue = ( abbr + '' ).replace(/[^a-zA-Z 0-9]+/g, '')
      if (dotLessShortValue.length <= 2) break
    }
    v = abbr + SCALES[index]
  }
  return v
}

export { abbrNumber as abbrYaron }
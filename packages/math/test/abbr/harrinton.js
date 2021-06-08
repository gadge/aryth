export class NumberAbbreviate {
  constructor(units) {
    this.units = units ?? [ 'k', 'm', 'b', 't' ]
  }

  static abbr(n, decPlaces, units) {
    const ab = new NumberAbbreviate(units)
    return ab.abbreviate(n, decPlaces)
  }

  _abbreviate(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces)
    for (let i = this.units.length - 1; i >= 0; i--) {
      const size = Math.pow(10, ( i + 1 ) * 3)
      if (size <= number) {
        number = Math.round(number * decPlaces / size) / decPlaces
        if (( number === 1000 ) && ( i < this.units.length - 1 )) {
          number = 1
          i++
        }
        number += this.units[i]
        break
      }
    }
    return number
  }

  abbreviate(number, decPlaces) {
    const isNegative = number < 0
    const abbreviatedNumber = this._abbreviate(Math.abs(number), decPlaces || 0)
    return isNegative ? '-' + abbreviatedNumber : abbreviatedNumber
  }
}

const harr = new NumberAbbreviate()

export const abbrHarr = x => harr.abbreviate(x)


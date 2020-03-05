import { decoCrostab, logger, says, xr } from '@spare/logger'
import { ClicheMag } from '@cliche/mag'
import { strategies } from '@valjoux/strategies'
import { rand, random } from '../src/rand'

const digitsToShiftBits = digits => digits * 3 + (~~((digits - 1) / 3) + 1)
export const randIntStr = digits => ~~(random() * (2 ** digitsToShiftBits(digits)))

const chronog = () => {
  const ints = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const E1_20 = 1.0E20
  const a = 1073741824
  const { lapse, result } = strategies({
    repeat: 4E+5,
    candidates: {
      d06: [6],
      d10: [10],
      d14: [14],
      d16: [15],
      d21: [21],
      d30: [30],
    },
    methods: {
      bench: d => {
        let t = ''
        while (d > 20) d -= 20, t += (random() * E1_20).toFixed(0)
        return t + (random() * 10 ** d).toFixed(0)
      },
      digit: d => {
        let t = ''
        while (d > 20) d -= 20, t += random().toFixed(20).substring(2)
        return t + random().toFixed(d).substring(2)
      },
      arch: d => {
        let tx = ''
        for (let i = 0; i < d; i++) tx += ints[rand(10)]
        return tx
      },
      dev: d => String(Math.floor(random() * (2 ** digitsToShiftBits(d)))).slice(0, d).padStart(d, '0'),
      fut: d => String(
        Math.floor(
          Number.parseInt(random().toString(16).slice(2), 16) << digitsToShiftBits(d))
      ).slice(0, d).padStart(d, '0'),
    }
  })
  lapse |> decoCrostab |> says['lapse']
  result |> decoCrostab |> says['result']

}
const fm = new ClicheMag(0, 3)
const testPrototype = () => {
// const x = 5
// return x * 4 // 0
// return x * 32 // 1 - bitshift: 4
// return x * 256 // 2 - bitshift: 7
// return x * 2048 // 3 - bitshift: 10
// return x * 16384 // 4 - bitshift: 14
// return x * 131072 // 5 - bitshift: 17
// return x * 1048576 // 6 - bitshift: 20
  for (let i = 1; i < 16; i++) {
    let dv = ~~((i - 1) / 3) + 1
    let md = (i - 1) % 3 + 1
    let sf = i * 3 + dv
    let mag = 2 ** sf
    let formatted = fm.form(mag)
    xr(i)['divBy3'](dv)['mod3'](md)['bitshift'](sf)['shifted'](formatted) |> logger
  }
}

const testInt = () => {
  for (let i = 1; i < 16; i++) {
    xr(i).rand(randIntStr(i) |> fm.form) |> logger
  }
}

testPrototype()
testInt()
Number.parseInt(random().toString(16).slice(2), 16) |> logger
chronog()



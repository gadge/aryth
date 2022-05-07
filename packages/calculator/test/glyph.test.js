import { says, x }    from '@spare/xr'
import { calculator } from '../index'

const nums = {
  H: 54,
  O: 12
}

const candidates = [
  'H',
  'H+O+8',
  'H*1.4',
  '-H',
  '=H',
  '+A+A',
]

const calc = calculator.bind({ nums })
for (let formula of candidates) {
  x[formula](calc(formula))  |> says['aryth']
}
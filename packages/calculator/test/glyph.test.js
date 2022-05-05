import { says, x }    from '@spare/xr'
import { Calculator } from '../index'

const constants = {
  H: 54,
  O: 12
}

const candidates = [
  'H',
  'H+O+8',
  'H*1.4',
  '-H',
  '=H'
]

const calculator = Calculator({ constants })
for (let formula of candidates) {
  x[formula](calculator(formula))  |> says['aryth']
}
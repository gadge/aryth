import { roundD2 }              from '@aryth/math'
import { PLANET }               from '@palett/presets'
import { DecoString, says, Xr } from '@spare/logger'
import { calculator }           from '../index.js'
import { InfixCollection }      from './resources/infixCollection.js'

const decoString = DecoString({ presets: PLANET })

const test = () => {
  for (let [ name, expression ] of Object.entries(InfixCollection)) {
    Xr().p(decoString(expression)).p(' = ').br(roundD2(calculator(expression))) |> says[name]
  }
}

test()

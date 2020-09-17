import { roundD2 }         from '@aryth/math'
import { PLANET }          from '@palett/presets'
import { says }            from '@palett/says'
import { DecoString, Xr }  from '@spare/logger'
import { calculator }      from '../index'
import { InfixCollection } from './resources/infixCollection'

const decoString = DecoString({ presets: PLANET })

const test = () => {
  for (let [name, expression] of Object.entries(InfixCollection)) {
    Xr().p(decoString(expression)).p(' = ').br(roundD2(calculator(expression))) |> says[name]
  }
}

test()

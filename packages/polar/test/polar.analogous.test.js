import { deco, says } from '@spare/logger'
import { Polar }      from '../src/Polar.js'

const polar = Polar.build(100, 120)

polar |> deco |> says['polar']

polar.analogous(5, 5)  |> deco |> says['polar'].br('analogous')
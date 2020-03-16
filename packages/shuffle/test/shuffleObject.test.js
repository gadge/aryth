import { simpleObjects } from '@foba/foo'
import { shuffleObject } from '../src/shuffleVector'
import { deco, delogger, says } from '@spare/logger'

const candidates = simpleObjects({ h: 8 })
candidates |> delogger
for (const [key, o] of Object.entries(candidates)) {
  shuffleObject(o, 4) |> deco |> says[key]
  // value |> Shuffler(4) |> logger
}

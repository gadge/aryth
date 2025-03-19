import { deco }                 from '@spare/deco'
import { logger }               from '@spare/logger'
import { combinationGenerator } from './combinationGenratatorAlpha.js'


function test() {
  let g = combinationGenerator(['foo', 'bar', 'zen', 'lea'], 2)
  let o
  while ((o = g.next()) && !o.done) {
    o |> deco |> logger
  }
}

test()
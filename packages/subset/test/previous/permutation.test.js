import { deco }                                from '@spare/deco'
import { logger }                                           from '@spare/logger'
import { permutationGenerator, permuteBefore, randPermute } from './permutationGeneratorAlpha.js'

// https://stackoverflow.com/questions/3543873/permutations-and-combinations


function test() {
  let g = permutationGenerator(['foo', 'bar', 'zen'])
  let o
  while ((o = g.next()) && !o.done) {
    o |> deco |> logger
  }
}

test()
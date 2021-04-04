import { deco }       from '@spare/deco'
import { logger }     from '@spare/logger'
import { combinator } from '../src/combinator'
import { permutator } from '../src/permutator'

{
  const list = [ 'a', 'b', 'c' ]
  const perm = permutator(list)
  const permutations = [ ...perm ]
  permutations |> deco |> logger
}

{
  const list = [ 'a', 'b', 'c' ]
  const comb = combinator(list, 2)
  const combinations = [ ...comb ]
  combinations |> deco |> logger
}


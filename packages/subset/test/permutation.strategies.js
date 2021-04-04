import { makeEmbedded } from '@foba/util'
import { says }         from '@palett/says'
import { decoCrostab }  from '@spare/logger'
import { strategies }   from '@valjoux/strategies'
import { swap }         from '@vect/swap'
import { permutator }   from '../src/permutator'

export function permutatorDev(vec) {
  function* _permutator(vec, lo = 0, hi = vec.length) {
    if (lo + 1 === hi) yield vec.slice()
    for (let i = lo; i < hi; i++) {
      swap.call(vec, lo, i)
      yield* _permutator(vec, lo + 1, hi)
      swap.call(vec, lo, i)
    }
  }
  return _permutator(vec, 0, vec.length)
}

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: {
    foo: [ 'a', 'b', 'c' ],
    bar: [ 'a', 'b', 'c', 'd' ]
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    cla: x => {
      const g = permutator(x)
      return [ ...g ]
    },
    rea: x => {
      const g = permutatorDev(x)
      return [ ...g ]
    },
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
import { delogger }        from '@spare/deco'
import { decoSamples }     from '@spare/logger'
import { calculator }      from '../index'
import { InfixCollection } from './resources/infixCollection'

const test = () => {
  const results = Object.entries(InfixCollection).map(
    ([name, expression]) => ({ name, expression, value: calculator(expression) })
  )
  results |> decoSamples |> delogger
}

test()

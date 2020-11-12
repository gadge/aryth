import { says }            from '@palett/says'
import { deco }            from '@spare/deco'
import { decoPhrase }      from '@spare/deco-string'
import { xr }              from '@spare/logger'
import { mapper }          from '@vect/object-mapper'
import { calcPostfix }     from '../src/calcPostfix'
import { infixToPostfix }  from '../src/infixToPostfix'
import { InfixCollection } from './resources/infixCollection'

const testInfixToPostfix = () => {
  for (const [name, infix] of Object.entries(InfixCollection)) {
    xr()['infix'](decoPhrase(infix, {}))['postfix'](infixToPostfix(infix) |> deco) |> says[name]
  }
}

const testCalcPostfix = () => {
  const postfixCollection = mapper(InfixCollection, infixToPostfix)
  for (const [name, postfix] of Object.entries(postfixCollection)) {
    xr()['postfix'](postfix |> deco)['calc'](calcPostfix(postfix) |> deco) |> says[name]
  }
}

testInfixToPostfix()

testCalcPostfix()

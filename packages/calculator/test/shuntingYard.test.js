import { deco }            from '@spare/deco'
import { decoPhrase }      from '@spare/deco-string'
import { says, xr }        from '@spare/logger'
import { mapper }          from '@vect/object-mapper'
import { calcPostfix }     from '../src/calcPostfix.js'
import { infixToPostfix }  from '../src/infixToPostfix.js'
import { InfixCollection } from './resources/infixCollection.js'

const testInfixToPostfix = () => {
  for (const [ name, infix ] of Object.entries(InfixCollection)) {
    xr()['infix'](decoPhrase(infix, {}))['postfix'](infixToPostfix(infix) |> deco) |> says[name]
  }
}

const testCalcPostfix = () => {
  const postfixCollection = mapper(InfixCollection, infixToPostfix)
  for (const [ name, postfix ] of Object.entries(postfixCollection)) {
    xr()['postfix'](postfix |> deco)['calc'](calcPostfix(postfix) |> deco) |> says[name]
  }
}

testInfixToPostfix()

testCalcPostfix()

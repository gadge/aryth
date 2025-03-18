export { Norm, Norm as Ziggurat }         from './src/normDist/Norm.js'
export { normIter, normIter as ziggurat } from './src/normDist/normIter.js'

export class Walk {
  static it
  static get iter() {
    return this.it
  }
}
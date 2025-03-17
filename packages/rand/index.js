export {
  rand, randIn, betw, betw as randBetw, betw as bw, randLong, randInt, randIntBetw, randLongStr,
}                                                         from './src/rand.js'
export { flop, flopIndex, flopKey, flopValue, flopEntry } from './src/flop.js'
export { flopGenerator }                                  from './src/flopGenerator.js'
export { shuffle }                                        from './src/shuffle.js'
export { Norm, Norm as Ziggurat }                         from './src/normDist/Norm.js'
export { norm, norm as ziggurat }                         from './src/normDist/generator.js'

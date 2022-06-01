export {
  E1, E2, E3,
  E4, E5, E6,
  E7, E8, E9,
  E10, E11, E12,
  E13, E14, E15,
}                                                    from './assets/large'
export { abbr }                                      from './src/abbr'
export { abs, intAbs }                               from './src/abs'
export { almostEqual, almostEquals, almostInt }      from './src/almost'
export { intExpon }                                  from './src/expon'
export { round, roundD1, roundD2, roundD3, roundD4 } from './src/round'
export { limBy, lim, recLim, lim0up, rec0up }        from './src/constraint'

export { has, hasOpen, hasROpen, hasLOpen } from './src/has'

export {
  limBy as constraint, lim as limit, recLim as restrict, lim0up as limitAboveZero, rec0up as restrictAboveZero
} from './src/constraint'
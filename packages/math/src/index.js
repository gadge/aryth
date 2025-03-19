export { E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15 } from '../assets/large.js'
export { abbr }                                                             from './abbr.js'
export { abs, intAbs }                                                      from './abs.js'
export { almostEqual, almostEquals, almostInt }                             from './almost.js'
export { intExpon }                                                         from './expon.js'
export {
  roundN3, roundN2, roundN1,
  roundD0, roundD0 as round, roundD1, roundD2, roundD3, roundD4,
}                                                                           from './round.js'
export { limBy, lim, recLim, lim0up, rec0up }                               from './constraint.js'
export { has, hasOpen, hasROpen, hasLOpen }                                 from './has.js'

export {
  limBy as constraint, lim as limit, recLim as restrict, lim0up as limitAboveZero, rec0up as restrictAboveZero,
} from './constraint.js'
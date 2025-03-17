import { rand } from './rand.js'

export const flopIndex = ar => rand(ar.length)

export const flop = ar => ar[flopIndex(ar)]

export const flopKey = ob => flop(Object.keys(ob))

export const flopValue = ob => flop(Object.values(ob))

export const flopEntry = ob => flop(Object.entries(ob))

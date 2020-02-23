import { rand } from './rand'

export const flopIndex = ar => rand(ar.length)

export const flop = ar => ar[flopIndex(ar)]

export const flopEntry = ob => Object.entries(ob) |> flop

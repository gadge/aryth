import { rand } from './rand'

export const flopIndex = ar => rand(ar.length)

export const flop = ar => ar[flopIndex(ar)]

export const flopKey = ob => Object.keys(ob) |> flop

export const flopValue = ob => Object.values(ob) |> flop

export const flopEntry = ob => Object.entries(ob) |> flop

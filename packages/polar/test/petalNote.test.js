import { Deco, deco, says } from '@spare/logger'
import { PetalNote }        from '../src/PetalNote'

const candidates = [
  30, 40, 100, 120, 170, 180, 190, 250, 260, 320, 330, 360
]

const petalNote = PetalNote.build(-36, 5)

petalNote.marks |> deco |> says['marks']
petalNote.counter  |> Deco({ vert: 1 })  |> says['counter']

for (let angle of candidates) {
  petalNote.note(angle) |> deco |> says['angle'].br(angle)
}

petalNote.counter |> Deco({ vert: 1 }) |> says['counter']


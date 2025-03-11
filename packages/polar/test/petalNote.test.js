import { Deco, deco, says } from '@spare/logger'
import { test }             from 'node:test'
import { PetalNote }        from '../src/PetalNote.js'

const candidates = [
  30, 40, 100, 120, 170, 180, 190, 250, 260, 320, 330, 360
]

const petalNote = PetalNote.build(-36, 5)

test('petal note', () => {

  says['marks'](deco(petalNote.angles))
  says['counter'](Deco({ vert: 1 })(petalNote.bin))

  for (let angle of candidates) {
    says['angle'].br(angle)(deco(petalNote.note(angle)))
  }

  says['counter'](Deco({ vert: 1 })(petalNote.bin))

  says['counter'](deco(petalNote.angles))

  petalNote.clear()

  says['counter'](deco(petalNote.bin))
})


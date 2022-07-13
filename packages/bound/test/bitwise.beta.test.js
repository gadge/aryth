import { strategies }            from '@valjoux/strategies'
import { decoCrostab }           from '@spare/logger'
import { says }                  from '@spare/xr'
import { triToInt as triToLong } from './bitwise.test'

const candidates = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 255],
  [0, 0, 0, 0, 255, 0],
  [0, 0, 0, 255, 0, 0],
  [0, 0, 255, 0, 0, 0],
  [0, 255, 0, 0, 0, 0],
  [255, 0, 0, 0, 0, 0],
  [255, 255, 255, 255, 255, 255],
]

// const intToSix = int => [int >> 40 & 0xFF, int >> 32 & 0xFF, int >> 24 & 0xFF, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF]
// const sixToInt = ([a, b, c, d, e, f]) => (triToInt(a, b, c) & 0xFFFFFF) << 24 + triToInt(d, e, f);

const p3 = x => String(x).padStart(3, '0')
const p9 = x => String(x).padStart(9)

export const shortToTri = int => [int >> 10 & 0x1F, int >> 5 & 0x1F, int & 0x1F]

const shortToSix = n => {
  const a = n >> 25 & 0x1F, b = n >> 20 & 0x1F, c = n >> 15 & 0x1F
  const d = n >> 10 & 0x1F, e = n >> 5 & 0x1F, f = n >> 0 & 0x1F
  return [a, b, c, d, e, f]
}
const longToSix = n => {
  const fore = (n / 0x1000000) & 0xFFFFFF, back = n & 0xFFFFFF
  const a = fore >> 16 & 0xFF, b = fore >> 8 & 0xFF, c = fore & 0xFF
  const d = back >> 16 & 0xFF, e = back >> 8 & 0xFF, f = back & 0xFF
  return [a, b, c, d, e, f]
}

const triToShort = (x, y, z) => ((x & 0xFF) >> 3 << 10) + ((y & 0xFF) >> 3 << 5) + ((z & 0xFF) >> 3)
const sixToShort = (a, b, c, d, e, f) => (triToShort(a, b, c) << 15) + triToShort(d, e, f)
const sixToLong = (a, b, c, d, e, f) => (triToLong(a, b, c) * 0x1000000) + triToLong(d, e, f)

export class ABCDEF extends Array {
  constructor(a, b, c, d, e, f) {
    super(a, b, c, d, e, f)
    this.short = (triToShort(a, b, c) << 15) + triToShort(d, e, f)
    this.long = triToLong(a, b, c) * 0x1000000 + triToLong(d, e, f)
  }
  static of(a, b, c, d, e, f) { return new ABCDEF(a, b, c, d, e, f) }
}

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    noir_noir: ABCDEF.of(0, 0, 0, 0, 0, 0),
    noir_bleu: ABCDEF.of(0, 0, 0, 0, 0, 255),
    noir_vert: ABCDEF.of(0, 0, 0, 0, 255, 0),
    noir_rouge: ABCDEF.of(0, 0, 0, 255, 0, 0),
    bleu_noir: ABCDEF.of(0, 0, 255, 0, 0, 0),
    vert_noir: ABCDEF.of(0, 255, 0, 0, 0, 0),
    rouge_noir: ABCDEF.of(255, 0, 0, 0, 0, 0),
    bleu_bleu: ABCDEF.of(0, 0, 255, 0, 0, 255),
    vert_vert: ABCDEF.of(0, 255, 0, 0, 255, 0),
    rouge_rouge: ABCDEF.of(255, 0, 0, 255, 0, 0),
    blanc_blanc: ABCDEF.of(255, 255, 255, 255, 255, 255),
  },
  methods: {
    ben: (a, b, c, d, e, f) => ({ a, b, c, d, e, f }),
    cla: (a, b, c, d, e, f) => [[a, b, c], [d, e, f]],
    // rea: (a, b, c, d, e, f) => ({ x: new RGB(a, b, c), y: new RGB(d, e, f) }),
    // arc: (a, b, c, d, e, f) => (p3(a) + p3(b) + p3(c) + p3(d) + p3(e) + p3(f)),
    dev: (a, b, c, d, e, f) => ({ x: triToLong(a, b, c), y: triToLong(d, e, f) }),
    sixToShort,
    shortToSix: (a, b, c, d, e, f) => shortToSix(sixToShort(a, b, c, d, e, f)),

    sixToLong,
    longToSix: (a, b, c, d, e, f) => longToSix(sixToLong(a, b, c, d, e, f))
  }
})

lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
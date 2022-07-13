import { makeEmbedded }        from '@foba/util'
import { says }                from '@spare/logger'
import { decoCrostab }         from '@spare/logger'
import { stringValue }         from '@texting/string-value'
import { isLiteral }           from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { strategies }          from '@valjoux/strategies'
import { iterate }             from '@vect/vector-mapper'

const CONFIG_X = {
  by: isNumeric,
  to: parseNum
}
const CONFIG_Y = {
  by: isLiteral,
  to: stringValue
}
const CONFIG_COLLECTION = [CONFIG_X, CONFIG_Y]

const { lapse, result } = strategies({
  repeat: 1E+2,
  candidates: {
    empty: [],
    one_zero: [0],
    one_nan: [NaN],
    asc_6: [0, 1, 2, 3, 4, 5],
    desc_6: [5, 4, 3, 2, 1, 0],
    misc: [false, 101, 102, 103, 104],
    misc2: [1, 2, NaN, 4, 5],
    tx_nums: ['244', '200', '306', '400', '150', '220', '190', '495'],
    tx_strs: 'comprehend how it\'s driven by animal spirits'.split(' '),
    tx_padded: ['  8', ' 64', '128', '1024', 'digits', ''],
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    cla: (words, [x = CONFIG_X, y = CONFIG_Y] = []) => {
      const hi = words?.length
      let veX = null, veY = null
      if (!hi) return [veX, veY]
      iterate(words, (v, i) => {
          if (x.by(v) && (veX ?? (veX = Array(hi)))) {
            if ((v = x.to(v)) > (veX.max ?? (veX.max = veX.min = v))) { veX.max = v } else if (v < veX.min) { veX.min = v }
            return veX[i] = v
          }
          if (y.by(v) && (veY ?? (veY = Array(hi)))) {
            if ((v = y.to(v)) > (veY.max ?? (veY.max = veY.min = v))) { veY.max = v } else if (v < veY.min) { veY.min = v }
            return veY[i] = v
          }
          return NaN
        },
        hi)
      return [veX, veY]
    }
    // rea: x => x,
    // arc: x => x,
    // dev: x => x,
    // fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
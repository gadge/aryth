import { makeEmbedded }        from '@foba/util'
import { says }                from '@palett/says'
import { decoCrostab }         from '@spare/logger'
import { stringValue }         from '@texting/string-value'
import { isLiteral }           from '@typen/literal'
import { isNumeric, parseNum } from '@typen/numeral'
import { strategies }          from '@valjoux/strategies'
import { duobound }            from '../utils/duobound'

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
    cla: vec => duobound(vec, CONFIG_COLLECTION),
    // rea: x => x,
    // arc: x => x,
    // dev: x => x,
    // fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
import { CrosTabX } from 'xbrief'
import { Chrono } from 'elprimero'

const { lapse, result } = Chrono.strategies({
  repeat: 5E+6,
  paramsList: {
    neg_0xffff: [-65535],
    neg_digit: [-100 / 6],
    neg_pi: [-Math.PI],
    neg_one: [-1],
    zero: [0],
    pos_one: [1],
    pos_pi: [Math.PI],
    pos_digit: [100 / 6],
    pos_0xffff: [65535],
  },
  funcList: {
    bench: x => x,
    signBit: n => n >> 31,
    native: Math.abs,
    manual: n => {
      if (n < 0) n = -n
      return n
    },
    classic: a => (a < 0) ? 0 - a : a,
    stable: n => {
      const mk = n >> 31 // make a mask of the sign bit
      n ^= mk // toggle the bits if value is negative
      n -= mk // n += temp & 1 // add one if value was negative
      return n
    },
    edge: n => (n + (n >>= 31)) ^ n,
    fut: (n, mk) => ((mk = n >> 31) ^ n) - mk,
    dev: n => {
      const m = n >> 31
      return (m ^ n) - m
    },
    arch: n => ((n >> 31) + n) ^ (n >> 31)
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log

import { decoCrostab, says } from '@spare/logger'
import { size }              from '@vect/matrix-size'
import { Chrono }            from '@valjoux/strategies'

const { lapse, result } = Chrono.strategies({
  repeat: 1E+7,
  paramsList: {
    misc: [[[1], [2], [3]]],
    foo: [[[1], [2], [3]], 1],
    bar: [[[1], [2], [3]], 1, 2],
  },
  funcList: {
    bench: (x) => size(x),
    dev: (x, h, w) => {
      h = h || x && x.length
      w = w || h && x[0] && x[0].length
      return [h, w]
    },
    arch: (x, h, w) => {
      h = h || x?.length
      w = w || h && x[0]?.length
      return ((h & 0xffff) << 16) + (w & 0xffff)
    },
    fut: (x, h, w) => {
      h = h || x && x.length
      w = w || h && (w = x[0]) && w.length
      return [h, w]
    },
    edge: (mx, ...hw) => {
      if (!hw) return size(mx)
      let r, h
      if (!(h = hw[0])) hw[0] = mx && mx.length
      if (!hw[1]) hw[1] = h && (r = mx[0]) && r.length
      return hw
    },
  }
})
lapse |> decoCrostab |> says.lapse
result |> decoCrostab |> says.result

import { Chrono }             from 'elprimero/src/Chrono'


function recur (ar, x, lo, hi) {
  if (lo > hi) return -1
  let id = ~~((lo + hi) >> 1)
  if (ar[id] > x) return recur(ar, x, lo, --id)
  if (ar[id] < x) return recur(ar, x, ++id, hi)
  return id
}

function rec_bs (ar, x) {
  return recur(ar, x, 0, ar.length - 1)
}

function ite_bs (ar, x) {
  let id, lo = 0, hi = ar.length - 1, el
  while (lo <= hi && (id = ~~((lo + hi) >> 1))) {
    el = ar[id]
    if (x < el && (hi = --id)) continue
    if (x > el && (lo = ++id)) continue
    return id
  }
  return -1
}

function ite_bs_range (ar, x) {
  let id, lo = 0, hi = ar.length - 1, el
  while (lo <= hi) {
    id = ~~((lo + hi) >> 1)
    el = ar[id]
    if (x < el) {
      hi = --id
      continue
    }
    if (x > el) {
      lo = ++id
      continue
    }
    return id
  }
  return id
}

// const ar = [0, 12, 24, 36, 48, 60, 72, 84, 96]
const ar = [-6, 6, 18, 30, 42, 54, 66, 78]
// const ar = [0, 96]
ite_bs_range(ar, 15) |> delogger
ite_bs_range(ar, 30) |> delogger
ite_bs_range(ar, 84) |> delogger
ite_bs_range(ar, -12) |> delogger
ite_bs_range(ar, 100)  |> delogger

const { lapse, result } = Chrono.strategies({
  repeat: 1E+6,
  paramsList: {
    simple: [ar, 84],
    misc: [ar, 0],
    another: [ar, 100],
  },
  funcList: {
    bench: ar => ar[0],
    native: (ar, x) => ar.indexOf(x),
    recur: rec_bs,
    iter: ite_bs
  }
})
'lapse' |> console.log
lapse |> CrosTabX.brief |> console.log
'' |> console.log
'result' |> console.log
result |> CrosTabX.brief |> console.log

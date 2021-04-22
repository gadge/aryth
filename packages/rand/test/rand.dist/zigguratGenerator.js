import { abs, exp, log, pow, sqrt } from '../../helper'

const R0 = 3.442619855899
const R1 = 1.0 / R0
const R0S = exp(-0.5 * R0 * R0)
const N2P32 = -pow(2, 32)
const M1 = 2147483648.0
const VN = 9.91256303526217e-3

let jsr = 123456789,
    wn  = Array(128),
    fn  = Array(128),
    kn  = Array(128)

const RNOR = () => {
  let hz = SHR3(),
      iz = hz & 127
  return abs(hz) < kn[iz]
    ? hz * wn[iz]
    : nfix(hz, iz)
}

const nfix = (hz, iz) => {
  let
    r  = R0,
    r1 = R1,
    x,
    y
  while (true) {
    x = hz * wn[iz]
    if (iz === 0) {
      x = -log(UNI()) * r1
      y = -log(UNI())
      while (y + y < x * x) {
        x = -log(UNI()) * r1
        y = -log(UNI())
      }
      return hz > 0
        ? r + x
        : -r - x
    }
    if (fn[iz] + UNI() * (fn[iz - 1] - fn[iz]) < exp(-0.5 * x * x))
      return x
    hz = SHR3()
    iz = hz & 127
    if (abs(hz) < kn[iz]) return hz * wn[iz]
  }
}

const SHR3 = () => {
  let m = jsr, n = jsr
  n ^= n << 13
  n ^= n >>> 17
  n ^= n << 5
  jsr = n
  return (m + n) | 0
}

const UNI = () => 0.5 + SHR3() / N2P32

const preset = () => {
  // seed generator based on current time
  jsr ^= new Date().getTime()
  let
    m1 = M1, dn = R0, tn = R0, vn = VN, q = vn / R0S
  kn[0] = ~~((dn / q) * m1)
  kn[1] = 0

  wn[0] = q / m1
  wn[127] = dn / m1

  fn[0] = 1.0
  fn[127] = R0S

  for (let i = 126; i >= 1; i--) {
    dn = sqrt(-2.0 * log(vn / dn + exp(-0.5 * dn * dn)))
    kn[i + 1] = ~~((dn / tn) * m1)
    tn = dn
    fn[i] = exp(-0.5 * dn * dn)
    wn[i] = dn / m1
  }
}

export function* zigguratGenerator() {
  preset()
  while (true) yield RNOR()
}
import { randomBytes } from 'node:crypto'
const { abs, exp, log, sqrt } = Math

const TAIL_INI = 3.442619855899 // R0: 第一个区域的右边界, 取值确保第一个区域的面积等于 1/N, N通常为128
const TAIL_INV = 1.0 / TAIL_INI // R1:  simply the reciprocal of R0, used in the tail sampling portion of the algorithm.
const BASE_VOL = 9.91256303526217e-3 // VN: base rect volume, determine the areas of diff regions in norm struct.
const PDF_HT = 2.669629083880923e-3 // R0S: exp(-0.5 * R0 * R0)
const BASE_WD = BASE_VOL / PDF_HT // constant, region width factor, the relation between (base rect volume) and (normal dist tail region).
const INT_MAX = 0x80000000 // M1: 2^31. scaling factor b/w float-point and int rep. max signed int32.
const FRA_SCA = -0x100000000 // N2P32: -2^32, scale xorshift() output to produce num ∈ [0,1].

export class Norm {
  seed
  wds
  hts
  ids
  constructor() {
    this.init()
  }
  static build() { return new Norm() }
  // sets up the tables needed for the algorithm.
  init() {
    // 使用 crypto 模块生成 4 字节随机种子
    const buffer = randomBytes(4)
    this.seed = buffer.readUInt32LE(0)

    this.wds = Array(128)
    this.hts = Array(128)
    this.ids = Array(128)

    let curr = TAIL_INI  // current "right boundary" of a norm layer
    let prev = curr // previous layer's right boundary

    this.ids[0] = ~~((curr / BASE_WD) * INT_MAX)
    this.ids[1] = 0

    this.wds[0] = BASE_WD / INT_MAX
    this.wds[127] = curr / INT_MAX

    this.hts[0] = 1.0
    this.hts[127] = PDF_HT

    for (let i = 126; i >= 1; i--) {
      curr = sqrt(-2.0 * log(BASE_VOL / curr + exp(-0.5 * curr * curr)))
      this.ids[i + 1] = ~~((curr / prev) * INT_MAX)
      prev = curr
      this.hts[i] = exp(-0.5 * curr * curr)
      this.wds[i] = curr / INT_MAX
    }
  }
  next() {
    let
      hz = this.xorshift(),
      iz = hz & 127
    return abs(hz) < this.ids[iz]
      ? hz * this.wds[iz]
      : this.retail(hz, iz)
  }
  // handles the tail of the normal distribution.
  retail(hz, iz) {
    let r = TAIL_INI, x, y
    while (true) {
      x = hz * this.wds[iz]
      if (iz === 0) {
        do {
          x = -log(this.rand()) * TAIL_INV
          y = -log(this.rand())
        } while (y + y < x * x)
        return hz > 0 ? r + x : -r - x
      }
      if (this.hts[iz] + this.rand() * (this.hts[iz - 1] - this.hts[iz]) < exp(-0.5 * x * x)) return x
      hz = this.xorshift()
      iz = hz & 127
      if (abs(hz) < this.ids[iz]) return hz * this.wds[iz]
    }
  }
  // generate a uniformly distributed random number between 0 and 1
  rand() { return 0.5 + this.xorshift() / FRA_SCA }
  // pseudo-random number generator
  xorshift() {
    let m = this.seed, n = m
    n ^= n << 13
    n ^= n >>> 17
    n ^= n << 5
    this.seed = n
    return (m + n) | 0
  }
}

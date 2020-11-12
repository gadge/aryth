import { rand } from '@aryth/rand'

const initV = (size, fn) => Array(size).fill(null).map((_, i) => fn(i))

export const candidates = {
  L256: initV(256, () => rand(256)),
  M256: initV(256, () => rand(128)),
  S256: initV(256, () => rand(32)),
  L128: initV(128, () => rand(128)),
  M128: initV(128, () => rand(64)),
  S128: initV(128, () => rand(16)),
  L064: initV(64, () => `P${rand(32)}`),
  M064: initV(64, () => `P${rand(16)}`),
  S064: initV(64, () => `P${rand(8)}`),
  L016: initV(16, () => `P${rand(16)}`),
  M016: initV(16, () => `P${rand(8)}`),
  S016: initV(16, () => `P${rand(4)}`),
}

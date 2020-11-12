export const longAbs = d => (d + (d >>= 63)) ^ d

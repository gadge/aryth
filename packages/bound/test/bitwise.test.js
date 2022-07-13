const candidates = [
  [0, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
  [255, 0, 0],
  [255, 255, 255]
]

export const intToTri = int => [int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF]
export const triToInt = (x, y, z) => ((x & 0xFF) << 16) + ((y & 0xFF) << 8) + (z & 0xFF);
export const intToSix = int => [int >> 40 & 0xFF, int >> 32 & 0xFF, int >> 24 & 0xFF, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF]
export const sixToInt = (a, b, c, d, e, f) => ((a & 0xFF) << 40) + ((b & 0xFF) << 32) + (c << 24 & 0xFF) + ((d & 0xFF) << 16) + ((e & 0xFF) << 8) + (f & 0xFF);

const p3 = x => String(x).padStart(3)
const p9 = x => String(x).padStart(9)
const test = () => {
  for (let [x, y, z] of candidates) {
    `[x] (${p3(x)}) [y] (${p3(y)}) [z] (${p3(z)}) [int] (${p9(triToInt([x, y, z]))})` |> console.log
  }
}

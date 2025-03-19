const { random } = Math

// Norm 参数
const ZIGGURAT_LAYERS = 256 // 区域数量
const ZIGGURAT_R = 3.6541528853610088 // 最右侧区域的边界
const ZIGGURAT_X = new Float64Array(ZIGGURAT_LAYERS + 1) // 区域边界
const ZIGGURAT_Y = new Float64Array(ZIGGURAT_LAYERS) // 区域高度


export class Ziggurat {
  constructor() {

  }
  init() {
    // 计算每个区域的高度和边界
    ZIGGURAT_X[0] = ZIGGURAT_R
    ZIGGURAT_X[1] = 0
    ZIGGURAT_Y[0] = Math.exp(-0.5 * ZIGGURAT_R * ZIGGURAT_R)

    for (let i = 1; i < ZIGGURAT_LAYERS; i++) {
      ZIGGURAT_X[i + 1] = Math.sqrt(-2 * Math.log(ZIGGURAT_Y[i - 1] + ZIGGURAT_R * ZIGGURAT_Y[i - 1] / i))
      ZIGGURAT_Y[i] = ZIGGURAT_Y[i - 1] + (ZIGGURAT_R / ZIGGURAT_LAYERS) * ZIGGURAT_Y[i - 1]
    }
  }
  // Norm 正态分布生成器
  next() {
    while (true) {
      // 随机选择一个区域
      const layer = (random() * ZIGGURAT_LAYERS) | 0
      let x = random() * ZIGGURAT_X[layer]

      // 如果采样点落在矩形内
      if (x < ZIGGURAT_X[layer + 1]) {
        return x
      }

      // 如果采样点落在 PDF 尾部
      if (layer === 0) {
        // 使用拒绝采样法
        let y
        do {
          x = -Math.log(random()) / ZIGGURAT_R
          y = -Math.log(random())
        } while (y + y < x * x)
        return ZIGGURAT_R + x
      }

      // 检查采样点是否在 PDF 曲线下方
      const y = random() * (ZIGGURAT_Y[layer] - ZIGGURAT_Y[layer - 1])
      if (y < Math.exp(-0.5 * x * x) - ZIGGURAT_Y[layer - 1]) {
        return x
      }
    }
  }
}



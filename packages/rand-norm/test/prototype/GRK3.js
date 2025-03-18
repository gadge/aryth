export class Ziggurat {
  constructor() {
    // Number of layers
    this.N = 256

    // Tail cutoff point (example value; should be computed precisely in practice)
    this.R = 3.442619855899

    // Precomputed tables (placeholders; replace with accurate values)
    this.X = new Array(this.N) // x-coordinates of layer boundaries
    this.F = new Array(this.N) // f(x_i) values

    // Initialize tables with approximate values
    // In a real implementation, these should be precomputed accurately
    this.X[0] = 0
    this.F[0] = Math.sqrt(2 / Math.PI) // f(0) = sqrt(2/pi)
    this.X[this.N - 1] = this.R
    this.F[this.N - 1] = this.f_Y(this.R)

    // Fill intermediate values (simplified linear interpolation for demo)
    for (let i = 1; i < this.N - 1; i++) {
      this.X[i] = (this.R * i) / (this.N - 1)
      this.F[i] = this.f_Y(this.X[i])
    }

    // Note: Accurate tables require solving equations to ensure equal areas
    // under the PDF for each layer. Refer to Marsaglia and Tsang (2000) or
    // GSL source code for precise values.
  }

  /**
   * PDF of Y = |X| where X ~ N(0,1), for y >= 0
   * @param {number} y - Input value
   * @returns {number} - PDF value
   */
  f_Y(y) {
    return Math.sqrt(2 / Math.PI) * Math.exp(-(y * y) / 2)
  }

  /**
   * Generates a standard normal random number
   * @returns {number} - Random number from N(0,1)
   */
  next() {
    while (true) {
      // Select a random layer (0 to 255)
      const i = Math.floor(Math.random() * this.N)
      const u = Math.random()
      const y = u * this.X[i]

      if (i < this.N - 1) {
        // Fast case: point lies within the rectangle of the next layer
        if (y < this.X[i + 1]) {
          return this.randomSign() * y
        } else {
          // Rejection test for the area between rectangle and PDF
          const f_y = this.f_Y(y)
          if (u * this.F[i] < f_y) {
            return this.randomSign() * y
          }
          // If rejected, loop continues
        }
      } else {
        // Tail case: sample from the tail region
        const tail_y = this.sampleTail()
        return this.randomSign() * tail_y
      }
    }
  }

  /**
   * Samples from the tail region (Y > R)
   * @returns {number} - Sample from the tail
   */
  sampleTail() {
    const r = this.R
    const c = Math.sqrt(2 / Math.PI) * Math.exp(-(r * r) / 2) / r
    const proposalRate = r // Rate for exponential proposal

    while (true) {
      const u = Math.random()
      // Generate from exponential distribution shifted by r
      const y = r - Math.log(u) / proposalRate
      const f_y = this.f_Y(y)
      const g_y = proposalRate * Math.exp(-proposalRate * (y - r))
      const v = Math.random()

      // Acceptance probability
      if (v < f_y / (c * g_y)) {
        return y
      }
    }
  }

  /**
   * Returns a random sign (+1 or -1)
   * @returns {number} - 1 or -1 with equal probability
   */
  randomSign() {
    return Math.random() < 0.5 ? -1 : 1
  }
}
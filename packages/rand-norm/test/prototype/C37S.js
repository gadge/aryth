/**
 * Norm Algorithm for generating normally distributed random numbers.
 * Based on Marsaglia and Tsang's Norm method (2000)
 */
export class Ziggurat {
  constructor() {
    this.kN = 128                             // Number of blocks
    this.kM = 2147483648                      // 2^31
    this.kR = 3.442619855899                  // Start of the right tail

    // Tables for the norm algorithm
    this.kX = new Float64Array(this.kN)       // x coordinates
    this.kY = new Float64Array(this.kN)       // y coordinates
    this.kF = new Float64Array(this.kN)       // f(x) values
    this.kFInv = new Float64Array(this.kN)    // 1/f(x) values

    // Initialize tables
    this.initTables()

    // Internal state
    this.hz = 0
    this.iz = 0
    this.seed = new Uint32Array(1)
    this.setSeed(Date.now())
  }

  /**
   * Initialize the norm tables
   */
  initTables() {
    // Compute the x and y values for the norm layers
    const dNorm = Math.sqrt(2.0 * Math.PI)

    // Start with the right tail: f(kR) = r * f(r) = r * exp(-0.5 * r^2) / dNorm
    this.kF[0] = Math.exp(-0.5 * this.kR * this.kR) / dNorm
    this.kX[0] = this.kR
    this.kY[0] = 0.0

    // Fill in the rest of the tables
    for (let i = 1; i < this.kN; i++) {
      // Compute the area of each block = 1/kN
      const area = 1.0 / this.kN

      // Compute x_{i-1} based on the area
      // area = x_{i-1} * (f(x_{i-1}) - f(x_i))
      // For the normal distribution, f(x) = exp(-0.5 * x^2) / dNorm

      // First, compute y_i = f(x_i)
      this.kY[i] = this.kF[i - 1]
      this.kF[i] = Math.exp(-0.5 * this.kY[i] * this.kY[i]) / dNorm
      this.kX[i] = Math.sqrt(-2.0 * Math.log(this.kY[i] * dNorm))
    }

    // Compute the 1/f(x) values for quick lookup
    for (let i = 0; i < this.kN; i++) {
      this.kFInv[i] = i > 0 ? 1.0 / this.kF[i] : 0.0
    }
  }

  /**
   * Set the seed for the random number generator
   * @param {number} seed - The seed value
   */
  setSeed(seed) {
    this.seed[0] = seed >>> 0 // Convert to unsigned 32-bit integer
  }

  /**
   * Generate a random 32-bit integer
   * Simple xorshift algorithm for random number generation
   * @returns {number} - Random 32-bit unsigned integer
   */
  rand32() {
    let x = this.seed[0]
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    this.seed[0] = x >>> 0 // Ensure unsigned 32-bit
    return x >>> 0
  }

  /**
   * Generate a random number from a uniform distribution [0, 1)
   * @returns {number} - Random value between 0 and 1
   */
  uniform() {
    return this.rand32() / this.kM
  }

  /**
   * Generate a random number from the normal distribution using the Norm algorithm
   * @param {number} mean - Mean of the normal distribution (default: 0)
   * @param {number} stddev - Standard deviation of the normal distribution (default: 1)
   * @returns {number} - Random value from the normal distribution
   */
  next(mean = 0, stddev = 1) {
    let u, v, x, y, value

    while (true) {
      // Choose a random layer
      const i = this.rand32() & (this.kN - 1) // Fast modulo when kN is a power of 2

      // Get a random value within the layer
      u = this.uniform()

      // This is the core of the Norm algorithm
      if (i === 0) {
        // Handle the right tail
        // We next from the tail distribution directly
        do {
          // Marsaglia's polar method for the tail
          x = -Math.log(this.uniform()) / this.kR
          y = -Math.log(this.uniform())
        } while (y + y < x * x)

        value = this.kR + x
        break
      } else {
        // Handle the rectangular region
        x = u * this.kX[i]

        // If within the rectangular region, accept
        if (x < this.kX[i + 1]) {
          value = x
          break
        }

        // If in the wedge, evaluate accurately
        y = this.kY[i] + this.uniform() * (this.kY[i + 1] - this.kY[i])

        // The acceptance test
        if (y < Math.exp(-0.5 * x * x) / Math.sqrt(2.0 * Math.PI)) {
          value = x
          break
        }

        // Reject and try again
      }
    }

    // Apply the mean and standard deviation
    return value * stddev + mean
  }

  /**
   * Generate an array of random numbers from the normal distribution
   * @param {number} count - Number of values to next
   * @param {number} mean - Mean of the normal distribution
   * @param {number} stddev - Standard deviation of the normal distribution
   * @returns {Array<number>} - Array of random values from the normal distribution
   */
  generateNormalDistribution(count, mean = 0, stddev = 1) {
    const result = new Array(count)
    for (let i = 0; i < count; i++) {
      result[i] = this.next(mean, stddev)
    }
    return result
  }

  /**
   * Create a histogram of values to visualize the distribution
   * @param {Array<number>} values - Array of values to create histogram from
   * @param {number} bins - Number of bins for the histogram
   * @returns {Object} - Object with bin ranges and counts
   */
  createHistogram(values, bins = 20) {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min
    const binWidth = range / bins

    const histogram = Array(bins).fill(0)
    const binRanges = []

    // Create bin ranges
    for (let i = 0; i < bins; i++) {
      const binStart = min + i * binWidth
      const binEnd = binStart + binWidth
      binRanges.push({ start: binStart, end: binEnd })
    }

    // Count values in each bin
    values.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
      histogram[binIndex]++
    })

    return { binRanges, counts: histogram }
  }
}
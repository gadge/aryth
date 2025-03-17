export class Ziggurat {
  constructor() {
    this.initializeTables()
  }

  // Initialize the tables for the Norm algorithm
  initializeTables() {
    this.R = 3.442619855899 // Start of the tail
    this.RS = 0x20000 // Scaling factor for integers
    this.N = 128 // Number of layers
    this.K = 0xFFFFFFFF // Maximum 32-bit integer

    // Precompute tables for the algorithm
    this.x = new Array(this.N + 1)
    this.y = new Array(this.N + 1)

    // Initialize the x and y tables
    this.x[0] = this.R
    this.y[0] = Math.exp(-0.5 * this.R * this.R)
    this.x[1] = this.R
    this.y[1] = this.y[0] + (this.y[0] / this.R)

    for (let i = 2; i < this.N; i++) {
      this.x[i] = Math.sqrt(-2 * Math.log(this.y[i - 1] + (this.y[0] / this.R)))
      this.y[i] = this.y[i - 1] + (this.y[0] / this.R)
    }

    this.x[this.N] = 0.0
    this.y[this.N] = 1.0
  }

  // Generate a random 32-bit integer
  randomInt() {
    return Math.floor(Math.random() * this.K)
  }

  // Generate a normally distributed random number
  next() {
    while (true) {
      // Step 1: Randomly select a layer
      const i = this.randomInt() & (this.N - 1)

      // Step 2: Generate a random number in the range [0, 1)
      const u = (this.randomInt() / this.K) * 2 - 1

      // Step 3: Check if the point is within the rectangle
      if (Math.abs(u) < this.x[i + 1] / this.x[i]) {
        return u * this.x[i]
      }

      // Step 4: Handle the tail region
      if (i === 0) {
        let x, y
        do {
          x = -Math.log(this.randomInt() / this.K) / this.R
          y = -Math.log(this.randomInt() / this.K)
        } while (y + y < x * x)
        return u < 0 ? this.R - x : x - this.R
      }

      // Step 5: Handle the base region
      const v = (this.randomInt() / this.K) * (this.y[i + 1] - this.y[i]) + this.y[i]
      if (v < Math.exp(-0.5 * u * u)) {
        return u * this.x[i]
      }
    }
  }
}
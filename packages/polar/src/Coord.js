import { radianToDegree } from './math.js'
import { Polar }          from './Polar.js'

export class Coord {
  x
  y
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  radius() {
    const { x, y } = this
    return Math.sqrt(x * x + y * y)
  }
  polarDegree() {
    return radianToDegree(Math.atan2(this.x, this.y))
  }
  toPolar() {
    const r = this.radius()
    const θ = this.polarDegree()
    return new Polar(r, θ)
  }
}
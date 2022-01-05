import { radianToDegree } from './math'

export class Coord {
  x
  y
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  radius() {
    const { x, y } = this
    return Math.sqrt(x * x, y * y)
  }
  polarDegree() {
    return radianToDegree(Math.atan2(this.x, this.y))
  }
}
export class Bound {
  min
  max
  constructor(min, max) {
    this.min = min
    this.max = max
  }
  static build(min, max) { return new Bound(min, max) }

  get dif() { return this.max - this.min }
  has(num) { return this.min <= num && num <= this.max }
  hasLOpen(num) { return this.min < num && num <= this.max }
  hasROpen(num) { return this.min <= num && num < this.max }
  hasOpen(num) { return this.min < num && num < this.max }

  limit(value) {
    if (value < this.min) return this.min
    if (value > this.max) return this.max
    return value
  }

  restrict(value) {
    const delta = this.max - this.min
    while (value < this.min) value += delta
    while (value > this.max) value -= delta
    return value
  }
}
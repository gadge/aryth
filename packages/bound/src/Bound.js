export class Bound {
  min
  max
  constructor(min, max) {
    this.min = min
    this.max = max
  }
  static build(min, max) { return new Bound(min, max) }

  has(num) { return this.min <= num && num <= this.max }
  hasLOpen(num) { return this.min < num && num <= this.max }
  hasROpen(num) { return this.min <= num && num < this.max }
  hasOpen(num) { return this.min < num && num < this.max }
}
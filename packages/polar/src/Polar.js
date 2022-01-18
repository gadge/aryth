import { Coord }                    from './Coord'
import { degreeToRadian, restrict } from './math'

const { PI, sin, cos } = Math

export class Polar {
  r
  θ
  constructor(r, θ) {
    this.r = r
    this.θ = θ
  }
  static build(r, θ) { return new Polar(r, θ) }
  get th() { return this.θ }
  set th(value) { return this.θ = value }
  copy() { return new Polar(this.r, this.θ) }
  selfRotate(degree) {
    const th = this.θ + degree
    this.th = restrict(th)
    return this
  }
  rotate(degree) {
    const th = this.θ + degree
    return new Polar(this.r, restrict(th))
  }
  complementary() { return this.rotate(180) }
  splitComplementary(deviation) {
    const complementary = this.rotate(180)
    const lower = complementary.rotate(-deviation)
    const upper = complementary.rotate(+deviation)
    return { lower, upper }
  }
  triadic(deviation = 120) {
    const lower = this.rotate(+deviation)
    const upper = this.rotate(-deviation)
    return { lower, upper }
  }
  analogous(delta, count) {
    const list = Array(count)
    let polar = this
    for (let i = 0; i < count; i++) list[i] = (polar = polar.rotate(delta))
    return list
  }

  foliateRadius(currAngle, petals = 3) {
    return this.r * cos(petals * (currAngle - this.θ) * PI / 180)
  }

  inFoliate(verge, petals = 3) {
    return this.r <= verge.foliateRadius(this.θ, petals)
  }

  toCartesian() {
    let { r, θ } = this
    const radiant = degreeToRadian(θ)
    const x = sin(radiant) * r
    const y = cos(radiant) * r
    return new Coord(x, y)
  }
}
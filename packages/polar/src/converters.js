import { Coord }                          from './Coord'
import { degreeToRadian, radianToDegree } from './math'
import { Polar }                          from './Polar'

export const polarToCartesian = (polar) => {
  const { r, θ } = polar
  const radiant = degreeToRadian(θ)
  const x = Math.sin(radiant) * r
  const y = Math.cos(radiant) * r
  return (x, y)
}
export const cartesianToPolar = (coord) => {
  const r = Coord.prototype.radius.call(coord)
  const θ = Coord.prototype.polarDegree.call(θ)
  return new Polar(r, θ)
}
export const polarDegree = ({ x, y }) => {
  return radianToDegree(Math.atan2(x, y))
}


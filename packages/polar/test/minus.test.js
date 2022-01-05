import { distance, minus } from '../src/math'

const entries = [
  [ 180, 90 ],
  [ 180, 270 ],
  [ 0, 270 ],
  [ 0, 90 ],
  [ 15, 345 ],
  [ 15, 45 ],
  [ 15, 135 ],
  [ 15, 255 ]
]

for (let [ a, b ] of entries) {
  console.log(`>> (a, b) = (${a}, ${b}) [distance] ${distance(a, b)} [minus] ${minus(a, b)}`)
}


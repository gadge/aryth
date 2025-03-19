import { roundD2 }                                              from '@aryth/math'
import { deco, DecoMatrix, decoMatrix, decoPale, logger, says } from '@spare/logger'
import { init, mapper }                                         from '@vect/matrix'
import { Coord }                                                from '../src/Coord.js'
import { Polar }                                                from '../src/Polar.js'

const polar = Polar.build(100, 120)

polar |> deco |> says['polar']

const roundCoord = (coord) => {
  coord.x = roundD2(coord.x)
  coord.y = roundD2(coord.y)
  return coord
}
for (let i = 0, polar = Polar.build(100, 120); i < 360; i += 30) {
  console.log(i, roundD2(polar.foliateRadius(i, 3)), roundCoord(polar.toCartesian()))
}


const coordMatrix = init(21, 21, (x, y) => new Coord((y - 10) * 10, (10 - x) * 10))

coordMatrix |> DecoMatrix({ read: decoPale }) |> logger

const mark = Polar.build(100, 0)

const FOLIATE_COUNT = 4

for (let i = 0; i < 360; i += 15) {
  const radius = mark.foliateRadius(i, FOLIATE_COUNT) |> roundD2
  i + ": " + (radius > 0 ? radius : 0)|> logger
}

const foliateMatrix = mapper(coordMatrix, (coord) => {
  const polar = coord.toPolar()
  const inFoliate = polar.inFoliate(mark, FOLIATE_COUNT)
  return inFoliate ? '+' : ' '
})

foliateMatrix |> decoMatrix |> logger





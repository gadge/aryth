import { roundD2 }                        from '@aryth/math'
import { LF, SP }                         from '@spare/enum-chars'
import { deco, decoMatrix, logger, says } from '@spare/logger'
import { init, mapper, size, transpose }  from '@vect/matrix'
import { cartesianToPolar }               from '../src/converters.js'
import { Coord }                          from '../src/Coord.js'
import { Polar }                          from '../src/Polar.js'

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

const decoCoordMatrix = (matrix) => {
  const [ xHi, yHi ] = size(matrix)
  const lines = Array(yHi)
  for (let j = 0; j < yHi; j++) {
    let row = Array(xHi)
    for (let i = 0; i < xHi; i++) {
      const { x, y } = matrix[i][j]
      row[i] = String(x).padStart(3) + '*' + String(y).padStart(3)
    }
    lines[yHi - j - 1] = SP.repeat(2) + row.join(',')
  }
  return '[' + LF + lines.join(LF) + LF + ']'
}

const coordMatrix = init(21, 21, (i, j) => new Coord(i - 10, j - 10))

coordMatrix |> decoCoordMatrix |> logger

const mark = Polar.build(10, 0)

const foliateMatrix = mapper(coordMatrix, (coord) => {
  const polar = cartesianToPolar(coord)
  const inFoliate = polar.inFoliate(mark, 5)
  return inFoliate ? '+' : ' '
});

(foliateMatrix |> transpose).reverse()  |> decoMatrix |> logger




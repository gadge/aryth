import { makeEmbedded }              from '@foba/util'
import { decoCrostab, logger, says } from '@spare/logger'
import { Ripper }                    from '@spare/ripper'
import { trim }                      from '@spare/string'
import { strategies }                from '@valjoux/strategies'
import { dateTime }                  from '@valjoux/timestamp-pretty'

export const REG = /[+\-*\/^(),]/g

export const fracture = (body, reg) => {
  let ms, bl, ph, pr = 0, cu = 0
  const vec = []
  while ((ms = reg.exec(body)) && ([ph] = ms)) {
    cu = ms.index
    bl = body.slice(pr, cu)
    if ((bl = bl.trim()).length) vec.push(bl)
    if ((ph = ph.trim()).length) vec.push(ph)
    pr = reg.lastIndex
  }
  if ((ph = body.slice(pr).trim()).length) vec.push(ph)
  return vec
}

export const expressionToVector = expression => fracture(expression, REG)

const ripper = Ripper(REG)

const test = () => {
  const { lapse, result } = strategies({
    repeat: 1E+6,
    candidates: {
      alpha: 'PI + abs(foo + 127)+ max(left, right)',
      beta: '1 + ( 2 * 3 )',
      gamma: 'a * x ^ 2 + b * x + c',
      standard: '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3',
      arithNeg: '5 + 4',
      combo: 'PI + abs(foo + 127)+ max(left, right)'
    } |> makeEmbedded,
    methods: {
      arch: expression => fracture(expression, REG),
      dev: expression => ripper(expression).map(trim),
      bench: x => x,
    }
  })
  lapse |> decoCrostab |> says['lapse'].p(dateTime())
  '' |> logger
  result |> decoCrostab |> says['result'].p(dateTime())
}
test()
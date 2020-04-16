const REG = /[+\-*\/^(),]/g

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

// const expression = 'PI + abs(foo + 127)+ max(left, right)'
//
// fracture(expression, REG) |> delogger

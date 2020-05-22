export const stringValueGamma = text => {
  // let l = isString(text) && text?.length
  let l = text?.length
  if (!l) return NaN
  text = text.slice(0, l).padEnd(4)
  return Buffer.from(text).readUIntBE(0, 4)
}

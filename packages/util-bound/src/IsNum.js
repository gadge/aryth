import { LOOSE, NONE, STRICT }          from '@typen/enum-check-levels'
import { isNumeric as isNumericLoose }  from '@typen/num-loose'
import { isNumeric as isNumericStrict } from '@typen/num-strict'

export const IsNum = (level = NONE) => {
  if (level === NONE) return x => !isNaN(x)
  if (level === LOOSE) return isNumericLoose
  if (level === STRICT) return isNumericStrict
  return isNumericStrict
}



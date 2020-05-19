import { LOOSE, NONE, STRICT }        from '@typen/enum-check-levels'
import { parseNum as parseNumLoose }  from '@typen/num-loose'
import { parseNum as parseNumStrict } from '@typen/num-strict'

export const ToNum = (level = 0) => {
  if (level === NONE) return x => x
  if (level === LOOSE) return parseNumLoose
  if (level === STRICT) return parseNumStrict
  return parseNumStrict
}

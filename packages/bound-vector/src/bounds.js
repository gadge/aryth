import { stringValue }  from '@spare/string'
import { hasLiteral }    from '@typen/literal'
import { isNumeric }    from '@typen/num-strict'
import { iterate }      from '@vect/vector-mapper'
import { parseNumeric } from '../utils/parseNumeric'

export const PRESETS = [
  { filter: isNumeric, mapper: parseNumeric },
  { filter: hasLiteral, mapper: stringValue }
]

/**
 *
 * @param words
 * @param presets
 * @return {*[][]}
 */
export const bounds = (
  words,
  presets = [],
) => {
  const
    len = words?.length,
    depth = presets.length,
    vecs = Array(depth)
  iterate(words, (v, i) => {
    for (
      let k = 0, filter, mapper;
      k < depth && ({ filter, mapper } = presets[k] ?? (presets[k] = {}));
      k++
    ) if (filter(v)) {
      const vec = vecs[k] ?? (vecs[k] = Array(len))
      if ((v = mapper ? mapper(v) : v) > (vec.max ?? (vec.max = vec.min = v))) { vec.max = v } else if (v < vec.min) { vec.min = v }
      return vec[i] = v
    }
    return NaN
  }, len)
  return vecs
}

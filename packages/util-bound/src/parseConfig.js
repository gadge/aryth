import { LOOSE } from '@typen/enum-check-levels'

export const parseConfig = config => {
  if (!config) config = {}
  if (config.dif) config.dif = false
  if (config.level) config.level = LOOSE
  return config
}

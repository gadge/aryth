import { logger }     from '@spare/logger'
import { xr }         from '@spare/xr'
import { CANDIDATES } from './CANDIDATES'
import { abbr }       from '../../src/abbr'

for (const [ key, value ] of Object.entries(CANDIDATES)) {
  xr()[key](value).abbr(abbr(value)) |> logger
}
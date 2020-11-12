import { Ripper } from '@spare/ripper'
import { trim }   from '@spare/string'

export const REG = /[+\-*\/^(),]/g

const ripper = Ripper(REG)

export const expressionToVector = expression => ripper(expression).map(trim)



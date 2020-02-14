import { shuffler } from '../utils/Shuffler'

export const shuffle = (ar, size) => shuffler.call({ length: ar.length, size }, ar)

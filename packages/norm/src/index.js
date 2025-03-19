export { Norm }     from './Norm.js'
export { normIter } from './normIter.js'

import { Norm } from './Norm.js'

export class Walk {
  static #iter
  static get iter() {
    return this.#iter ?? (this.#iter = new Norm())
  }
  static next(stdev = 1) {
    if (!this.#iter) this.#iter = new Norm()
    return this.#iter.next() * stdev
  }
}

/** @type {(stdev:number=1)=>number} */
export const n = Walk.next.bind(Walk)
import { near, restrict } from '../index'


export class PetalNote {
  marks // Array<double>
  counter // Object<int, int>
  epsilon = 0 // double
  sum // int

  /**
   *
   * @param {number} startAngle
   * @param {number} count
   * @return {PetalNote}
   */
  static build(startAngle, count) {
    return (new PetalNote()).initialize(startAngle, count)
  }

  /**
   *
   * @param {number} startAngle
   * @param {number} count
   * @return {PetalNote}
   */
  initialize(startAngle, count) {
    const unit = 360.0 / count
    this.epsilon = unit / 2
    this.marks = Array(count)
    this.counter = {}
    this.sum = 0
    for (let angle = restrict(startAngle), i = 0; i < count;) {
      this.marks[i] = angle
      this.counter[++i] = 0
      angle = restrict(angle + unit)
    }
    return this
  }
  get count() { return this.marks.length } // int
  clear() {
    this.sum = 0
    for (let key in this.counter) this.counter[key] = 0
    return this
  }
  phase(θ) {
    θ = restrict(θ)
    let i = 0
    for (let mark of this.marks) {
      if (near(mark, θ, this.epsilon)) { return ++i }
      else { ++i }
    }
    return void 0
  }
  note(θ) {
    const phase = this.phase(θ)
    this.notePhase(phase)
    return phase
    // return { phase: phase, count: this.notePhase(phase) }
  }
  notePhase(phase) {
    this.sum++
    return this.counter[phase] += 1
  }
}

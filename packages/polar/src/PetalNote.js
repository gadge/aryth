import { mutate }         from '@vect/vector-mapper'
import { near, restrict } from './math.js'


export class PetalNote {
  /** @type {number}   */ epsilon = 0 // double
  /** @type {number[]} */ angles     // marks
  /** @type {number[]} */ bin        // counters
  /** @type {number}   */ count       // sum

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
   * @param {number} petals
   * @return {PetalNote}
   */
  initialize(startAngle, petals) {
    const delta = 360.0 / petals
    this.epsilon = delta / 2
    this.angles = Array(petals)
    this.bin = Array(petals)
    this.count = 0
    for (let angle = restrict(startAngle), i = 0; i < petals; i++) {
      this.angles[i] = angle
      this.bin[i] = 0
      angle = restrict(angle + delta)
    }
    return this
  }
  get petals() { return this.angles.length } // int
  clear() {
    this.count = 0
    mutate(this.bin, () => 0)
    return this
  }
  phase(θ) {
    θ = restrict(θ)
    const { angles, epsilon, petals } = this
    for (let i = 0; i < petals; i++) {
      if (near(angles[i], θ, epsilon)) return i
    }
    return void 0
  }
  note(θ) {
    const phase = this.phase(θ)
    this.notePhase(phase)
    return phase
    // return { phase: phase, petals: this.notePhase(phase) }
  }
  notePhase(phase) {
    this.count++
    return this.bin[phase] += 1
  }
}

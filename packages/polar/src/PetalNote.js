import { near, restrict } from '../index'


export class PetalNote {
  marks // List<double>
  counter // IDictionary<int, int>
  epsilon = 0 // double
  sum // int
  static build(startAngle, count) {
    return new PetalNote().initialize(startAngle, count)
  }
  initialize(startAngle, count) {
    const unit = 360.0 / count
    this.epsilon = unit / 2
    this.marks = Array(count)
    this.counter = {}
    this.sum = 0
    let angle = restrict(startAngle)
    for (let i = 0; i < count;) {
      this.marks.push(angle)
      this.counter[++i] = 0
      angle = restrict(angle + unit)
    }
    return this
  }
  get count() { return this.marks.count } // int
  clear() {
    this.sum = 0
    for (let key in this.counter) this.counter[key] = 0
    return this
  }
  phase(θ) {
    θ = restrict(θ)
    for (let i = 0, count = this.count; i < count; i++) {
      if (near(this.marks[i], θ, this.epsilon)) return i + 1
    }
    return this.count
  }
  note(θ) {
    const phase = this.phase(θ)
    return { phase: phase, count: this.notePhase(phase) }
  }
  notePhase(phase) {
    this.sum++
    return this.counter[phase] += 1
  }
}

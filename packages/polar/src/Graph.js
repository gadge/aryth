import { finiteFlopper } from '@aryth/flopper'
import { PetalNote }     from './PetalNote'

const { PI, pow, round } = Math

export class Graph {
  static foliumAreaOdd = 0.25
  static foliumAreaEven = 0.5

  // list<(double r, double θ)>
  static rhodoneaFolios(list, rimMark, petals = 3) {
    return list.filter(polar => polar.r <= rimMark.foliateRadius(polar.θ, petals))
  }

// list<(double r, double θ)>
  static floppedRhodoneaFolios(list, rimMark, petals, density) {
    const area = PI * pow(rimMark.r, 2) * (petals % 2 === 0 ? Graph.foliumAreaEven : Graph.foliumAreaOdd)
    const maximum = round(density * area)
    const thresholdPerPhrase = maximum / petals
    console.log(`>> [petals] ${petals} [area] ${area} [maximum] ${maximum} [threshold/phase] ${thresholdPerPhrase}`)
    /** @type {PetalNote} */
    const petalNote = PetalNote.build(rimMark.θ, petals)
    const target = Array(maximum)
    for (const polar of finiteFlopper(list)) {
      if (rimMark.foliateRadius(polar.θ, petals) < polar.r) continue
      const phase = petalNote.phase(polar.θ)
      console.log(`    >> [phase] ${phase} [counter] ${petalNote.counter[phase]}`)
      if (thresholdPerPhrase <= petalNote.counter[phase]) {
        console.log("")
        continue
      }
      console.log(" ... keep recording")
      petalNote.notePhase(phase)
      target.add(polar)
      if (maximum <= petalNote.sum) break
    }
    console.log("")
    return target
  }
}

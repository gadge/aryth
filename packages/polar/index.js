import { finiteFlopper } from '@aryth/flopper';
import { mutate } from '@vect/vector-mapper';

const { abs, min, PI: PI$2 } = Math;

const degreeToRadian = degree => degree * PI$2 / 180;
const radianToDegree = radian => radian * 180 / PI$2;

const distance = (θa, θb) => {
  const d = abs(θa - θb);
  return min(d, abs(360 - d))
};

const add = (θa, θb) => {
  return restrict(θa + θb)
};

const minus = (θa, θb) => {
  const rawDf = θa - θb,
        posDf = abs(rawDf),
        negDf = abs(360 - posDf);
  return posDf <= negDf
    ? rawDf > 0 ? posDf : -posDf
    : rawDf < 0 ? negDf : -negDf
};

const near = (θa, θb, epsilon) => {
  return distance(θa, θb) <= epsilon
};

const contains = (interval, th) => {
  const [ a, b ] = interval;
  return a <= b ? a < th && th < b : a < th || th < b
};

const restrict = (th) => {
  while (th > 360) th -= 360;
  while (th < 0) th += 360;
  return th
};

class PetalNote {
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
    const delta = 360.0 / petals;
    this.epsilon = delta / 2;
    this.angles = Array(petals);
    this.bin = Array(petals);
    this.count = 0;
    for (let angle = restrict(startAngle), i = 0; i < petals; i++) {
      this.angles[i] = angle;
      this.bin[i] = 0;
      angle = restrict(angle + delta);
    }
    return this
  }
  get petals() { return this.angles.length } // int
  clear() {
    this.count = 0;
    mutate(this.bin, () => 0);
    return this
  }
  phase(θ) {
    θ = restrict(θ);
    const { angles, epsilon, petals } = this;
    for (let i = 0; i < petals; i++) {
      if (near(angles[i], θ, epsilon)) return i
    }
    return void 0
  }
  note(θ) {
    const phase = this.phase(θ);
    this.notePhase(phase);
    return phase
    // return { phase: phase, petals: this.notePhase(phase) }
  }
  notePhase(phase) {
    this.count++;
    return this.bin[phase] += 1
  }
}

const { PI: PI$1, pow, round } = Math;

class Graph {
  static foliumAreaOdd = 0.25
  static foliumAreaEven = 0.5

  // list<(double r, double θ)>
  static rhodoneaFolios(list, rimMark, petals = 3) {
    return list.filter(polar => polar.r <= rimMark.foliateRadius(polar.θ, petals))
  }

// list<(double r, double θ)>
  static floppedRhodoneaFolios(list, rimMark, petals, density) {
    const area = PI$1 * pow(rimMark.r, 2) * (petals % 2 === 0 ? Graph.foliumAreaEven : Graph.foliumAreaOdd);
    const maximum = round(density * area);
    const thresholdPerPhrase = maximum / petals;
    console.log(`>> [petals] ${petals} [area] ${area} [maximum] ${maximum} [threshold/phase] ${thresholdPerPhrase}`);
    /** @type {PetalNote} */
    const petalNote = PetalNote.build(rimMark.θ, petals);
    const target = Array(maximum);
    for (const polar of finiteFlopper(list)) {
      if (rimMark.foliateRadius(polar.θ, petals) < polar.r) continue
      const phase = petalNote.phase(polar.θ);
      console.log(`    >> [phase] ${phase} [counter] ${petalNote.bin[phase]}`);
      if (thresholdPerPhrase <= petalNote.bin[phase]) {
        console.log("");
        continue
      }
      console.log(" ... keep recording");
      petalNote.notePhase(phase);
      target.add(polar);
      if (maximum <= petalNote.count) break
    }
    console.log("");
    return target
  }
}

const { PI, sin, cos } = Math;

class Polar {
  r
  θ
  constructor(r, θ) {
    this.r = r;
    this.θ = θ;
  }
  static build(r, θ) { return new Polar(r, θ) }
  get th() { return this.θ }
  set th(value) { return this.θ = value }
  copy() { return new Polar(this.r, this.θ) }
  selfRotate(degree) {
    const th = this.θ + degree;
    this.th = restrict(th);
    return this
  }
  rotate(degree) {
    const th = this.θ + degree;
    return new Polar(this.r, restrict(th))
  }
  complementary() { return this.rotate(180) }
  splitComplementary(deviation) {
    const complementary = this.rotate(180);
    const lower = complementary.rotate(-deviation);
    const upper = complementary.rotate(+deviation);
    return { lower, upper }
  }
  triadic(deviation = 120) {
    const lower = this.rotate(+deviation);
    const upper = this.rotate(-deviation);
    return { lower, upper }
  }
  analogous(delta, count) {
    const list = Array(count);
    let polar = this;
    for (let i = 0; i < count; i++) list[i] = (polar = polar.rotate(delta));
    return list
  }

  foliateRadius(currAngle, petals = 3) {
    return this.r * cos(petals * (currAngle - this.θ) * PI / 180)
  }

  inFoliate(verge, petals = 3) {
    return this.r <= verge.foliateRadius(this.θ, petals)
  }

  toCartesian() {
    let { r, θ } = this;
    const radiant = degreeToRadian(θ);
    const x = sin(radiant) * r;
    const y = cos(radiant) * r;
    return new Coord(x, y)
  }
}

class Coord {
  x
  y
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  radius() {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y)
  }
  polarDegree() {
    return radianToDegree(Math.atan2(this.x, this.y))
  }
  toPolar() {
    const r = this.radius();
    const θ = this.polarDegree();
    return new Polar(r, θ)
  }
}

const polarToCartesian = (polar) => {
  const { r, θ } = polar;
  const radiant = degreeToRadian(θ);
  const x = Math.sin(radiant) * r;
  const y = Math.cos(radiant) * r;
  return new Coord(x, y)
};
const cartesianToPolar = (coord) => {
  const r = Coord.prototype.radius.call(coord);
  const θ = Coord.prototype.polarDegree.call(coord);
  return new Polar(r, θ)
};
const polarDegree = ({ x, y }) => {
  return radianToDegree(Math.atan2(x, y))
};

export { Coord, Graph, PetalNote, Polar, add, cartesianToPolar, contains, degreeToRadian, distance, minus, near, polarDegree, polarToCartesian, radianToDegree, restrict };

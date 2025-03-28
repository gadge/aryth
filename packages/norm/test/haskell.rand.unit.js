const { random } = Math
import { demoTape } from './renderer/demoTape.js'

// Box-Muller transform to generate normally distributed random numbers
function nextNorm() {
  const u0 = random()
  const u1 = random()
  const r = Math.sqrt(-2.0 * Math.log(u0))
  const theta = 2.0 * Math.PI * u1
  return r * Math.sin(theta)
}

// Main function to run tests
const main = () => {

  const unitSize = 0.2
  const genList = length => Array.from({ length }, nextNorm)  // Generate n normally distributed numbers
  demoTape(genList(1000), unitSize)
  demoTape(genList(200000), unitSize)
}

// Execute the main function
main()

function createStat(numbers, unitSize) {
  // unitSize is bin width
  function record(value, unitSize) { // Put a value into the appropriate bin in the tally map
    const block = this
    const bin = Math.round(value / unitSize)
    if (!(bin in block)) block[bin] = 0
    return block[bin] += 1
  }
  const stat = {}
  let sum = 0.0, sumProd = 0.0
  for (let i = 0, value; i < numbers.length; i++) {
    sum += (value = numbers[i])
    sumProd += value * value
    record.call(stat, value, unitSize)
  }
  return { sum, sumProd, stat }
}

// Print stars for a given bin
function render(currBin, unitSize, maxCount) {
  const stat = this
  const count = stat[currBin] ?? 0
  const bin = unitSize * currBin
  const barThres = 50
  const barSize = maxCount <= barThres ? count : Math.floor((barThres * count) / maxCount)
  const bar = '■'.repeat(barSize)
  console.log(`${bin.toFixed(2).padStart(5)}: ${bar}  ${count}`)
}

// Run the test with a given sample size
export const distributionDemoTape = (numbers, unitSize) => {
  // Tally the values into bins and compute sum and sum of squares
  const { sum, sumProd, stat } = createStat(numbers, unitSize)

  // Compute mean and standard deviation
  const mean = sum / numbers.length
  const stdev = Math.sqrt(sumProd / numbers.length - mean * mean)

  console.log('-'.repeat(60))
  console.log(`count: ${numbers.length}`)
  console.log(`mean:  ${mean.toFixed(7)}`)
  console.log(`stdev: ${stdev.toFixed(7)}`)

  // Find the maximum count and bin range
  const lo = Math.max(...Object.keys(stat))
  const hi = Math.min(...Object.keys(stat))
  const max = Math.max(...Object.values(stat))
  // Print stars for each bin in the range
  for (let bin = hi; bin <= lo; bin++) {
    render.call(stat, bin, unitSize, max)
  }
}
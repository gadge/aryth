// Example usage
function demonstrateZiggurat() {
  const ziggurat = new Ziggurat()

  // Set a specific seed for reproducibility
  ziggurat.setSeed(12345)

  // Generate individual values
  console.log('Individual random normal values:')
  for (let i = 0; i < 5; i++) {
    console.log(`Sample ${i + 1}: ${ziggurat.next().toFixed(6)}`)
  }

  // Generate a distribution
  const mean = 50
  const stdDev = 10
  const count = 100000

  console.log(`\nGenerating ${count} values with mean=${mean}, stdDev=${stdDev}`)
  const startTime = process.hrtime()

  const values = ziggurat.generateNormalDistribution(count, mean, stdDev)

  const endTime = process.hrtime(startTime)
  const timeInMs = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2)

  // Calculate statistics
  const actualMean = values.reduce((sum, val) => sum + val, 0) / values.length
  const actualVariance = values.reduce((sum, val) => sum + Math.pow(val - actualMean, 2), 0) / values.length
  const actualStdDev = Math.sqrt(actualVariance)

  console.log(`Time taken: ${timeInMs} ms`)
  console.log(`Actual mean: ${actualMean.toFixed(4)} (expected: ${mean})`)
  console.log(`Actual std dev: ${actualStdDev.toFixed(4)} (expected: ${stdDev})`)

  // Display histogram (optional)
  /*
  const histogram = norm.createHistogram(values, 20);
  console.log("\nHistogram:");
  histogram.binRanges.forEach((range, i) => {
    const barLength = Math.round(histogram.counts[i] / count * 100);
    const bar = '#'.repeat(Math.min(barLength, 50));
    console.log(`${range.start.toFixed(2)} - ${range.end.toFixed(2)}: ${bar} (${histogram.counts[i]})`);
  });
  */
}

// Run the demonstration
demonstrateZiggurat()
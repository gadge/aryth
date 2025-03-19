import { test } from 'node:test'
import { Norm } from '../src/Norm.js'

const ziggurat = Norm.build()
const samples = Array.from({ length: 1e7 }, () => ziggurat.next())
const mean = samples.reduce((sum, x) => sum + x, 0) / samples.length
const variance = samples.reduce((sum, x) => sum + (x - mean) ** 2, 0) / samples.length

test('norm precision', () => {
  console.log(`Mean: ${mean}`)      // 接近 0
  console.log(`Variance: ${variance}`) // 接近 1
})

import { test }             from 'node:test'
import { Norm as EPIC }     from '../index.js'
import { n }                from '../src/index.js'
import { Ziggurat as C37S } from './prototype/C37S.js'
import { Ziggurat as DSR1 } from './prototype/DSR1.js'
import { Ziggurat as DSV3 } from './prototype/DSV3.js'
import { Ziggurat as GRK3 } from './prototype/GRK3.js'


const dsr1 = new DSR1()
const dsv3 = new DSV3()
const c37s = new C37S()
const grk3 = new GRK3()
// const epic = new EPIC()

test('norm benchmark', () => {
  const TEST_DSR1 = 'dsr1'
  const TEST_DSV3 = 'dsv3'
  const TEST_C37S = 'c37s'
  const TEST_GRK3 = 'grk3'
  const TEST_EPIC = 'epic'

  const quant = 1e7
  console.log(TEST_DSR1, dsr1.next())
  console.log(TEST_DSV3, dsv3.next())
  console.log(TEST_C37S, c37s.next())
  console.log(TEST_GRK3, grk3.next())
  console.log(TEST_EPIC, n())

  console.time(TEST_DSR1)
  for (let i = 0; i < quant; i++) dsr1.next()
  console.timeEnd(TEST_DSR1)
  console.time(TEST_DSV3)
  for (let i = 0; i < quant; i++) dsv3.next()
  console.timeEnd(TEST_DSV3)
  console.time(TEST_C37S)
  for (let i = 0; i < quant; i++) c37s.next()
  console.timeEnd(TEST_C37S)
  console.time(TEST_GRK3)
  for (let i = 0; i < quant; i++) grk3.next()
  console.timeEnd(TEST_GRK3)
  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++)  n()
  console.timeEnd(TEST_EPIC)

})
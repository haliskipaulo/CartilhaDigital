import { sum, clamp } from './math'

test('sum adds two numbers', () => {
  expect(sum(2, 3)).toBe(5)
})

test('clamp works', () => {
  expect(clamp(10, 0, 5)).toBe(5)
})


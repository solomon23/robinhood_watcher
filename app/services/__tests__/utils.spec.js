
import { USD } from '../utils'

describe('utils', () => {
  it('should format currency', () => {
    expect(
      USD(10)
    ).toEqual('$10.00')
  })

  it('should format negative currency', () => {
    expect(
      USD(-10)
    ).toEqual('-$10.00')
  })

  it('should format zero currency', () => {
    expect(
      USD(0)
    ).toEqual('$0.00')
  })

  it('should format string currency', () => {
    expect(
      USD('10.33333333333')
    ).toEqual('$10.33')
  })
})

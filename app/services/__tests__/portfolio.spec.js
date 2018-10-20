
import { calculateEquity } from '../portfolio'

describe('portfolio', () => {
  it('should calc during working hours', () => {
    expect(
      calculateEquity({
        equity: 10,
        adjusted_equity_previous_close: 20,
      })
    ).toEqual({
      afterHoursEquityDifference: null,
      equity: "$10.00",
      equityDifference: "-$10.00 (-50.00%)",
    })
  })

  it('should calc after working hours', () => {
    expect(
      calculateEquity({
        equity: 10,
        extended_hours_equity: 12,
        adjusted_equity_previous_close: 20,
      })
    ).toEqual({
      afterHoursEquityDifference: "+$2.00 (+20.00%)",
      equity: "$12.00",
      equityDifference: "-$10.00 (-50.00%)",
    })
  })

  it('should calc negative values', () => {
    expect(
      calculateEquity({
        equity: 10,
        extended_hours_equity: 8,
        adjusted_equity_previous_close: 20,
      })
    ).toEqual({
      afterHoursEquityDifference: "-$2.00 (-20.00%)",
      equity: "$8.00",
      equityDifference: "-$10.00 (-50.00%)",
    })
  })
})

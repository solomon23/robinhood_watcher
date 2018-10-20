import { USD } from './utils'

export function calculateEquity(portfolio) {
  const equity = USD(portfolio.extended_hours_equity || portfolio.equity)

  let equityDifference = portfolio.equity - portfolio.adjusted_equity_previous_close
  const percentDifference = `${Math.abs(100 * equityDifference / portfolio.adjusted_equity_previous_close).toFixed(2)}%`
  const sign = equityDifference >= 0 ? '+' : ''

  equityDifference = `${sign}${USD(equityDifference)} (${equityDifference >= 0 ? '+' : '-'}${percentDifference})`

  let afterHoursEquityDifference = null
  if (portfolio.extended_hours_equity) {
    afterHoursEquityDifference = portfolio.extended_hours_equity - portfolio.equity

    const afterHoursSign = afterHoursEquityDifference >= 0 ? '+' : ''
    const afterPercent = `${Math.abs(100 * afterHoursEquityDifference / portfolio.equity).toFixed(2)}%`

    afterHoursEquityDifference = `${afterHoursSign}${USD(afterHoursEquityDifference)} (${afterHoursSign}${afterPercent})`
  }

  return {
    equity,
    equityDifference,
    afterHoursEquityDifference,
  }
}

export default {
  calculateEquity,
}

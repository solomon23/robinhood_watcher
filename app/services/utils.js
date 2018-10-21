// @flow
const currency = require('currency.js')

const currencyOptions = {
  separator: ',',
  decimal: '.',
  symbol: '$',
  formatWithSymbol: true,
}

export function USD(amount: string | number) {
  return currency(amount, currencyOptions).format(true)
}

export default { USD }

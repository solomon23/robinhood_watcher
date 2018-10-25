// @flow
import React, { Component } from 'react'
import StockRow from './StockRow'
import styles from './styles/StockList.scss'

type Props = {
  stocks: Array<Stock>,
  viewBy: string
}

export default class StockList extends Component<Props> {
  props: Props

  render() {
    const { stocks, viewBy } = this.props

    if (!stocks || stocks.length === 0) {
      return null
    }

    return (
      <div className={styles.stockList}>
        {stocks.sort((a, b) => a.symbol.localeCompare(b.symbol)).map(stock => (
          <StockRow key={stock.symbol} stock={stock} viewBy={viewBy} />
        ))}
      </div>
    )
  }
}

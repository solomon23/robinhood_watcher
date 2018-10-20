// @flow
import React, { Component } from 'react'
import StockRow from './StockRow'
import styles from './styles/StockList.scss'

type Props = {
  stocks: Array
}

export default class StockList extends Component<Props> {
  props: Props

  render() {
    const { stocks } = this.props

    return (
      <div className={styles.stockList}>
        {stocks.sort((a, b) => a.symbol.localeCompare(b.symbol)).map(stock => (
          <StockRow key={stock.symbol} stock={stock} />
        ))}
      </div>
    )
  }
}

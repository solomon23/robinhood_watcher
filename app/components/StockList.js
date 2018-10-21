// @flow
import React, { Component } from 'react'
import StockRow from './StockRow'
import WatchRow from './WatchRow'
import styles from './styles/StockList.scss'

type Props = {
  stocks: Array,
  watchlist: boolean
}

export default class StockList extends Component<Props> {
  props: Props

  render() {
    const { stocks, watchlist } = this.props

    if (!stocks || stocks.length === 0) {
      return null
    }

    return (
      <div className={styles.stockList}>
        {stocks.sort((a, b) => a.symbol.localeCompare(b.symbol)).map(stock => (
          watchlist ? (
            <WatchRow key={stock.symbol} stock={stock} />
          ) : (
            <StockRow key={stock.symbol} stock={stock} />
          )
        ))}
      </div>
    )
  }
}

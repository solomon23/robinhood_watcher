// @flow
import React, { Component } from 'react'
import WatchRow from './WatchRow'
import styles from './styles/StockList.scss'

type Props = {
  stocks: Array<WatchStock>
}

export default class WatchList extends Component<Props> {
  props: Props

  render() {
    const { stocks } = this.props

    if (!stocks || stocks.length === 0) {
      return null
    }

    return (
      <div className={styles.stockList}>
        {stocks.sort((a, b) => a.symbol.localeCompare(b.symbol)).map(stock => (
          <WatchRow key={stock.symbol} stock={stock} />
        ))}
      </div>
    )
  }
}

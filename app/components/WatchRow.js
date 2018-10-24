// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { USD } from '../services/utils'
import styles from './styles/StockRow.scss'
import { createStockWindow } from '../services/windows'

type Props = {
  stock: Stock
}

export default class WatchRow extends Component<Props> {
  props: Props

  static onClick(symbol: string) {
    createStockWindow(symbol)
  }

  render() {
    const { stock } = this.props

    const price = stock.last_extended_hours_trade_price || stock.last_trade_price
    const oldPrice = stock.previous_close

    const dif = (price - oldPrice)
    const difference = `${dif > 0 ? '+' : ''}${USD(dif)}`

    return (
      <div className={styles.stockRow} onClick={() => WatchRow.onClick(stock.symbol)}>
        <div className={styles.sybmol}>
          {stock.symbol}
        </div>
        <div className={classnames(styles.value, { [styles.loss]: dif < 0 })}>
          {difference}
        </div>
      </div>
    )
  }
}

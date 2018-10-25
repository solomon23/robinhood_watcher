// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { USD } from '../services/utils'
import styles from './styles/StockRow.scss'
import { createStockWindow } from '../services/windows'
import { VIEW_BY } from '../actions/settings'

type Props = {
  stock: Stock,
  viewBy: string
}

export default class WatchRow extends Component<Props> {
  props: Props

  static onClick(symbol: string) {
    createStockWindow(symbol)
  }

  render() {
    const { stock, viewBy } = this.props

    const price = stock.last_extended_hours_trade_price || stock.last_trade_price
    const oldPrice = stock.previous_close

    let difference = ''
    let dif = 0

    switch(viewBy) {
      case VIEW_BY.INDIVIDUAL:
      case VIEW_BY.TOTAL:
        dif = (price - oldPrice)
        difference = `${dif > 0 ? '+' : ''}${USD(dif)}`
        break

      case VIEW_BY.PERCENT:
        dif = ((price - oldPrice) * 100) / oldPrice
        difference = `${dif > 0 ? '+' : ''}${dif.toFixed(2)}%`
        break

      default: break
    }

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

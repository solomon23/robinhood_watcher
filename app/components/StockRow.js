// @flow
import React, { Component } from 'react'
import pluralize from 'pluralize'
import classnames from 'classnames'
import { createStockWindow } from '../services/windows'
import { USD } from '../services/utils'
import styles from './styles/StockRow.scss'
import { VIEW_BY } from '../actions/settings'

type Props = {
  stock: Stock,
  viewBy: string
}

export default class StockRow extends Component<Props> {
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
      case VIEW_BY.TOTAL:
        dif = (price - oldPrice)
        difference = `${dif > 0 ? '+' : ''}${USD((stock.quantity || 0) * dif)}`
        break

      case VIEW_BY.INDIVIDUAL:
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
      <div className={styles.stockRow} onClick={() => StockRow.onClick(stock.symbol)}>
        <div className={styles.sybmol}>
          {stock.symbol}
          <div className={styles.count}>{Number(stock.quantity)} {pluralize('Share', stock.quantity)}</div>
        </div>
        <div className={classnames(styles.value, { [styles.loss]: dif < 0 })}>
          {difference}
        </div>
      </div>
    )
  }
}

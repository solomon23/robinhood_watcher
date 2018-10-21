// @flow
import React, { Component } from 'react'
import pluralize from 'pluralize'
import classnames from 'classnames'
import { ipcRenderer } from 'electron'
import { USD } from '../services/utils'
import styles from './styles/StockRow.scss'

type Props = {
  stock: Stock
}

export default class StockRow extends Component<Props> {
  props: Props

  static onClick(symbol: string) {
    ipcRenderer.send('CHART', { symbol })
  }

  render() {
    const { stock } = this.props

    const price = stock.last_extended_hours_trade_price || stock.last_trade_price
    const oldPrice = stock.previous_close

    const dif = (price - oldPrice)
    const difference = `${dif > 0 ? '+' : ''}${USD((stock.quantity || 0) * dif)}`

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

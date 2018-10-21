// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { ipcRenderer } from 'electron'
import { USD } from '../services/utils'
import styles from './styles/StockRow.scss'

type Props = {
  stock: object
}

export default class WatchRow extends Component<Props> {
  props: Props

  static onClick(symbol) {
    ipcRenderer.send('CHART', { symbol })
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

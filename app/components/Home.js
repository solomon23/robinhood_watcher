// @flow
import React, { Component } from 'react'
import classnames from 'classnames'
import { calculateEquity } from '../services/portfolio'
import styles from './styles/Home.scss'
import { USD } from '../services/utils'
import StockList from './StockList'

type Props = {
  portfolio: object,
  positions: array,
  actions: object,
  getAllData: () => void,
  startRefreshTimer: () => void
}

export default class Home extends Component<Props> {
  props: Props

  constructor(context, props) {
    super(context, props)

    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    const { startRefreshTimer } = this.props

    // getAllData()
    startRefreshTimer()
  }

  refresh() {
    const { getAllData } = this.props

    getAllData()
  }

  render() {
    const { portfolio, positions, actions } = this.props

    if (!Object.keys(portfolio).length > 0) {
      return null
    }

    const {
      equity,
      equityDifference,
      afterHoursEquityDifference,
    } = calculateEquity(portfolio)

    const isReloading = actions.portfolioLoading || actions.positionsLoading

    return (
      <div className={styles.equityContainer}>
        <div className={styles.header}>
          <div onClick={this.refresh} className={classnames(styles.refresh, { [styles.reloading]: isReloading })} />
          <div className={styles.equity}>
            {USD(equity)}
          </div>
          <div className={styles.change}>
            {equityDifference} Today
          </div>
          {afterHoursEquityDifference && (
            <div className={styles.afterHours}>
              {afterHoursEquityDifference} After Hours
            </div>
          )}
        </div>
        <StockList stocks={positions} />
      </div>
    )
  }
}
